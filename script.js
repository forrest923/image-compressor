// 获取DOM元素
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const previewSection = document.getElementById('previewSection');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const quality = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const downloadBtn = document.getElementById('downloadBtn');

let originalFile = null;

// 监听文件上传
imageInput.addEventListener('change', handleImageUpload);

// 监听质量滑块变化
quality.addEventListener('input', function() {
    qualityValue.textContent = this.value + '%';
    if (originalFile) {
        compressImage(originalFile, this.value / 100);
    }
});

// 处理图片上传
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }

    originalFile = file;
    
    // 显示原图大小
    originalSize.textContent = formatFileSize(file.size);
    
    // 预览原图
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImage.src = e.target.result;
        // 显示预览区域
        previewSection.style.display = 'block';
        // 压缩图片
        compressImage(file, quality.value / 100);
    }
    reader.readAsDataURL(file);
}

// 压缩图片
function compressImage(file, qualityValue) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 创建 canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 绘制图片
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // 导出压缩后的图片
            canvas.toBlob(
                function(blob) {
                    // 显示压缩后的图片
                    compressedImage.src = URL.createObjectURL(blob);
                    // 显示压缩后的文件大小
                    compressedSize.textContent = formatFileSize(blob.size);
                    
                    // 更新下载按钮
                    downloadBtn.onclick = () => downloadImage(blob);
                },
                'image/jpeg',
                qualityValue
            );
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 下载压缩后的图片
function downloadImage(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 拖拽上传功能
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#4CAF50';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#ddd';
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
        imageInput.files = e.dataTransfer.files;
        handleImageUpload({ target: { files: [file] } });
    }
}); 