export default class RosConnection {
	static instance;
	constructor() {
		if (RosConnection.instance) {
			return RosConnection.instance;
		}
		this.currentPosition = [0, 0, 0, 0, 0, 0];
		this.trajectory = [0, 0, 0, 0, 0, 0];
		this.roslibConnected = false;
		this.init();
	}
	/**
	 *
	 * @returns {void} // ros connection instance
	 * @description return ros connection instance
	 **/
	init() {
		this.ros = new ROSLIB.Ros({
			// url: 'ws://51.83.12.237:9090',
			url: 'wss://vniryo.vittascience.com',
		});
		this.ros.on('connection', function () {
			console.log('Connected to ROS websocket server.');
			this.roslibConnected = true;
		});

		this.ros.on('error', function (error) {
			console.log('Error connecting to ROS websocket server: ', error);
		});

		this.ros.on('close', function () {
			console.log('Connection to ROS websocket server closed.');
			this.roslibConnected = false;
		});

		this.planService = new ROSLIB.Service({
			ros: this.ros,
			name: '/plan_kinematic_path',
			serviceType: 'moveit_msgs/GetMotionPlan',
		});
	}

	/**
	 *
	 * @param {array} jointPositions// [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6] in radians
	 * @returns // unused for now
	 */
	directKine(jointPositions) {
		this.forwardKinematicsService = new ROSLIB.Service({
			ros: this.ros,
			name: '/niryo_robot/kinematics/forward',
			serviceType: 'niryo_robot_arm_commander/GetFK',
		});
		this.forwardRequest = new ROSLIB.ServiceRequest({
			joints: jointPositions,
		});

		return new Promise((resolve, reject) => {
			forwardKinematicsService.callService(forwardRequest, (response) => {
				console.log('Résultat de la cinématique directe :', response);
				return resolve(response);
			});
		});
	}

	/**
	 *
	 * @param {array} pose // [x, y, z, roll, pitch, yaw] in radians
	 * @returns {array} jointPositions // [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6] in radians
	 **/
	async computeInverseKinematics(pose) {
		const position = { x: pose[0], y: pose[1], z: pose[2] };
		const rpy = { roll: pose[3], pitch: pose[4], yaw: pose[5] };
		// const twist = { linear: { x: 0.0, y: 0.0, z: 0.0 }, angular: { x: 0.0, y: 0.0, z: 1.0 } };
		const inverseKinematicsService = new ROSLIB.Service({
			ros: this.ros,
			name: '/niryo_robot/kinematics/inverse',
			serviceType: 'niryo_robot_arm_commander/GetIK',
		});

		const inverseRequest = new ROSLIB.ServiceRequest({
			pose: {
				position: position,
				rpy: rpy,
			},
		});
		return new Promise((resolve, reject) => {
			inverseKinematicsService.callService(
				inverseRequest,
				(response) => {
					// console.log('Résultat de la cinématique inverse :', response);
					resolve(response.joints);
				},
				function (error) {
					reject(error);
				}
			);
		});
	}
	/**
	 *
	 * @param {array} jointPositions // [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6] in radians
	 * @returns {array} pose // [x, y, z, roll, pitch, yaw] in radians
	 */
	async computeForwardKinematics(jointPositions) {
		const forwardKinematicsService = new ROSLIB.Service({
			ros: this.ros,
			name: '/niryo_robot/kinematics/forward',
			serviceType: 'niryo_robot_arm_commander/GetFK',
		});

		const forwardRequest = new ROSLIB.ServiceRequest({
			joints: [jointPositions[0], jointPositions[1], jointPositions[2], jointPositions[3], jointPositions[4], jointPositions[5]],
		});
		// console.log('joint', jointPositions);
		return new Promise((resolve, reject) => {
			forwardKinematicsService.callService(
				forwardRequest,
				(response) => {
					const pose = [response.pose.position.x, response.pose.position.y, response.pose.position.z, response.pose.rpy.roll, response.pose.rpy.pitch, response.pose.rpy.yaw];
					// console.log('Résultat de la cinématique directe :', pose);
					resolve(pose);
				},
				function (error) {
					reject(error);
				}
			);
		});
	}

	/**
	 *
	 * @param {array} startingPosition // [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6]
	 * @param {array} destPosition // [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6]
	 * @param {number} angle// for future use => switch between radians and degrees
	 * @return {array} trajectory // return list of points to follow (joint_1, joint_2, joint_3, joint_4, joint_5, joint_6)
	 */

	async getTrajectory(startingPosition, destPosition, angle) {
		if (!startingPosition || !destPosition) throw new Error('Missing startingPosition or destPosition');
		if (angle === 'deg') {
			this.currentPosition = startingPosition.map((deg) => (deg * Math.PI) / 180);
			this.trajectory = destPosition.map((deg) => (deg * Math.PI) / 180);
		} else {
			this.currentPosition = startingPosition;
			this.trajectory = destPosition;
		}
		this.request = {
			motion_plan_request: {
				workspace_parameters: {
					header: {
						frame_id: 'base_link',
					},
					min_corner: {
						x: -1,
						y: -1,
						z: -1,
					},
					max_corner: {
						x: 1,
						y: 1,
						z: 1,
					},
				},
				start_state: {
					joint_state: {
						position: this.currentPosition,
						name: ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6'],
					},
				},
				goal_constraints: [
					{
						joint_constraints: [
							{
								joint_name: 'joint_1',
								position: this.trajectory[0],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
							{
								joint_name: 'joint_2',
								position: this.trajectory[1],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
							{
								joint_name: 'joint_3',
								position: this.trajectory[2],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
							{
								joint_name: 'joint_4',
								position: this.trajectory[3],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
							{
								joint_name: 'joint_5',
								position: this.trajectory[4],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
							{
								joint_name: 'joint_6',
								position: this.trajectory[5],
								tolerance_above: 0.005,
								tolerance_below: 0.005,
								weight: 1.0,
							},
						],
					},
				],
				group_name: 'arm',
				num_planning_attempts: 3,
				allowed_planning_time: 2,
				planner_id: '',
				max_velocity_scaling_factor: 1,
				max_acceleration_scaling_factor: 1,
			},
		};
		return new Promise((resolve, reject) => {
			this.planService.callService(
				this.request,
				function (result) {
					// console.log('Result:', result);
					// console.log('Result:', result.motion_plan_response.trajectory.joint_trajectory.points);
					return resolve(result.motion_plan_response.trajectory.joint_trajectory.points);
				},
				function (error) {
					console.log('Error:', error);
					return reject(error);
				}
			);
		});
	}

	/**
	 *
	 * @param {array} startingJointPos // [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6] in radians
	 * @param {array} startingPosition// [x, y, z, roll, pitch, yaw] in radians
	 * @param {array} destPosition // [x, y, z, roll, pitch, yaw] in radians
	 * @return {array} trajectory // return list of points to follow (joint_1, joint_2, joint_3, joint_4, joint_5, joint_6)
	 * @description compute linear trajectory between two points (A and B) in cartesian space
	 * @todo : update the timestamp to fit the ros timestamp
	 **/

	async getLinearTrajectory(startingJointPos, startingPosition, destPosition) {
		const cartesianPathService = new ROSLIB.Service({
			ros: this.ros, // Votre instance ROS
			name: '/compute_cartesian_path',
			serviceType: 'moveit_msgs/GetCartesianPath',
		});
		// console.log('Starting position:', startingPosition);
		// console.log('Dest position:', destPosition);

		let currentDate = new Date();
		let timeInMilliseconds = currentDate.getTime();
		let seconds = Math.floor(timeInMilliseconds / 1000);
		let nanoseconds = (timeInMilliseconds % 1000) * 1000000; // 1 milliseconde = 1 000 000 nanosecondes

		const cartesianPathRequest = new ROSLIB.ServiceRequest({
			header: {
				// seq: 0,
				// stamp: {
				// 	sec: seconds,
				// 	nsec: nanoseconds,
				// },
				frame_id: 'base_link',
			},
			start_state: {
				joint_state: {
					header: {
						// seq: 1,
						// stamp: {
						// 	sec: 0,
						// 	nsec: 0,
						// },
						frame_id: 'tool_link',
					},
					name: ['joint_1', 'joint_2', 'joint_3', 'joint_4', 'joint_5', 'joint_6'],
					position: startingJointPos,
				},
			},
			group_name: 'arm',
			link_name: 'tool_link',
			waypoints: [
				// Waypoint (A => starting position) et Waypoint (B => destination)
				{
					position: {
						x: startingPosition[0],
						y: startingPosition[1],
						z: startingPosition[2],
					},
					orientation: {
						x: startingPosition[3],
						y: startingPosition[4],
						z: startingPosition[5],
						w: 1,
					},
				},
				{
					position: {
						x: destPosition[0],
						y: destPosition[1],
						z: destPosition[2],
					},
					orientation: {
						x: destPosition[3],
						y: destPosition[4],
						z: destPosition[5],
						w: 1,
					},
				},
			],
			max_step: 0.01, // maybe increase this value
			avoid_collisions: true,
			// path_constraints: {
			//     to do
			// },
		});

		return new Promise((resolve, reject) => {
			cartesianPathService.callService(
				cartesianPathRequest,
				function (response) {
					console.log('Trajectoire cartésienne :', response);
					resolve(response.solution.joint_trajectory.points);
				},
				function (error) {
					console.log('Erreur :', error);
				}
			);
		});
	}
}
