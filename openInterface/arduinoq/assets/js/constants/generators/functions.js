const FUNCTIONS_ARDUINO_Q = {
    'py': {
        DEF_CAPTURE_WEBCAM_IMAGE:
`def capture_webcam_image(output_dir=".", camera_index=0):
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    image_path = output_dir / f"image_{timestamp}.jpg"

    cap = cv2.VideoCapture(camera_index)

    if not cap.isOpened():
        raise RuntimeError(f"Impossible d'ouvrir la caméra USB index {camera_index}")

    # Optionnel : force une résolution raisonnable
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    # On lit quelques frames pour laisser la caméra s'initialiser
    frame = None
    for _ in range(5):
        ret, frame = cap.read()

    cap.release()

    if not ret or frame is None:
        raise RuntimeError("Impossible de capturer une image depuis la caméra")

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