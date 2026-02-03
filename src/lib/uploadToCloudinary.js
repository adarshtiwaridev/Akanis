const uploadToCloudinary = (file, type, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();

    form.append("file", file);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    );

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Cloudinary upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Upload error"));

    const endpoint = `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
    }/${type === "video" ? "video" : "image"}/upload`;

    xhr.open("POST", endpoint);
    xhr.send(form);
  });
};
