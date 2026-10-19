const FUNCTIONS_ARDUINO_Q = {
    'py': {
        DEF_CAPTURE_WEBCAM_IMAGE:
`def capture_webcam_image(output_dir=".", camera_index=0):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    image_path = output_dir / f"image_{timestamp}.jpg"

    # The UNO Q exposes non-camera video devices (e.g. /dev/video0 = Venus decoder),
    # so if the requested index is not a camera, try the other /dev/video* devices
    global current_webcam_index
    import time

    # At boot the app can start before the USB camera is ready, so keep rescanning for a while
    ret, frame = False, None
    for attempt in range(30):
        indexes = [camera_index] + sorted(
            int(p.name[5:]) for p in Path("/dev").glob("video*")
            if p.name[5:].isdigit() and int(p.name[5:]) != camera_index
        )

        for index in indexes:
            cap = cv2.VideoCapture(index)
            if cap.isOpened():
                # Optionnel : force une résolution raisonnable
                cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
                cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

                # On lit quelques frames pour laisser la caméra s'initialiser
                for _ in range(5):
                    ret, frame = cap.read()
            cap.release()

            if ret and frame is not None:
                if index != camera_index:
                    print(f"[camera] Caméra index {camera_index} indisponible, utilisation de l'index {index}")
                    current_webcam_index = index
                break

        if ret and frame is not None:
            break
        print("[camera] Aucune caméra prête, nouvelle tentative dans 2 s...")
        time.sleep(2)

    if not ret or frame is None:
        raise RuntimeError("Impossible de capturer une image depuis une caméra USB")

    cv2.imwrite(str(image_path), frame)

    print(f"[camera] Image capturée : {image_path}")

    return Image.open(image_path)`,

        DEF_GET_CAMERA_LIST:
`def get_camera_list():
    cameras = []

    for video_path in sorted(Path("/dev").glob("video*")):
        video_id = video_path.name.replace("video", "")

        if not video_id.isdigit():
            continue

        name_path = Path("/sys/class/video4linux") / video_path.name / "name"

        if name_path.exists():
            try:
                name = name_path.read_text(encoding="utf-8").strip()
            except Exception:
                name = str(video_path)
        else:
            name = str(video_path)

        cameras.append({
            "id": int(video_id),
            "device": str(video_path),
            "name": name
        })

    return cameras`
    },
    'cpp': {
        
    },
    'js': {

    }
}