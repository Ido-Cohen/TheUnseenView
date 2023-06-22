function resizeImage() {
    const imagePreview = document.getElementById('image-preview');
    const cropPosition = document.querySelector('input[name="crop-position"]:checked').value;
  
    const originalWidth = imagePreview.naturalWidth;
    const originalHeight = imagePreview.naturalHeight;
    const targetWidth = 1920;
    const targetHeight = 1080;
  
    let resizedWidth, resizedHeight;
    let xOffset = 0;
    let yOffset = 0;
  
    const originalAspectRatio = originalWidth / originalHeight;
    const targetAspectRatio = targetWidth / targetHeight;
  
    if (originalAspectRatio > targetAspectRatio) {
      resizedWidth = targetWidth;
      resizedHeight = Math.round(targetWidth / originalAspectRatio);
  
      if (cropPosition.includes('top')) {
        yOffset = 0;
      } else if (cropPosition.includes('middle')) {
        yOffset = Math.round((resizedHeight - targetHeight) / 2);
    } else {
      yOffset = resizedHeight - targetHeight;
    }
  } else {
    resizedHeight = targetHeight;
    resizedWidth = Math.round(targetHeight * originalAspectRatio);

    if (cropPosition.includes('left')) {
      xOffset = 0;
    } else if (cropPosition.includes('center')) {
      xOffset = Math.round((resizedWidth - targetWidth) / 2);
    } else {
      xOffset = resizedWidth - targetWidth;
    }
  }

  imagePreview.style.width = `${resizedWidth}px`;
  imagePreview.style.height = `${resizedHeight}px`;
  imagePreview.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;

  const resultDiv = document.getElementById('result');
  resultDiv.innerText = `Resized to ${resizedWidth}x${resizedHeight}, Crop: ${cropPosition}`;
}

  