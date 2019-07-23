var picturedAnimation = function () {
    var self = this;

    let canvasId = null;
    let x = null;
    let y = null;
    let width = null;
    let height = null;
    let picBaseUrl = null;
    let startPicIndex = null;
    let endPicIndex = null;
    let picFileExtensionName = null;
    let fps = null;
    let loop = null;
    let onComplete = null;

    let canvas = null;
    let canvasContext = null;
    let canvasWidth = null;
    let canvasHeight = null;
    let canvasImage = null;
    let canvasTimer = null;
    let currentPicIndex = null;

    this.setVal = function (canvasId, x, y, width, height, picBaseUrl, startPicIndex, endPicIndex, picFileExtensionName, fps, loop, onComplete) {
        this.canvasId = canvasId;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.picBaseUrl = picBaseUrl;
        this.startPicIndex = startPicIndex;
        this.endPicIndex = endPicIndex;
        this.picFileExtensionName = picFileExtensionName;
        this.fps = fps;
        this.loop = loop;
        this.onComplete = onComplete;

        
        this.canvas = document.getElementById(this.canvasId);
        this.canvasContext = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.canvasImage = new Image();
    };

    this.play = function () {
        this.currentPicIndex = this.startPicIndex;
        this.canvasTimer = setInterval(displayPic, 1000 / this.fps);
    };

    this.stop = function () {
        clearInterval(this.canvasTimer);
    };

    function displayPic() {
        self.canvasImage.src = self.picBaseUrl + self.currentPicIndex + '.' + self.picFileExtensionName;
        self.canvasImage.onload = function () {
            self.canvasContext.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
            self.canvasContext.drawImage(self.canvasImage, self.x, self.y, self.width, self.height);
        };

        self.currentPicIndex++;

        if (self.currentPicIndex > self.endPicIndex) {
            // 最后一张图已放完

            if (self.loop) {
                // 循环
                self.currentPicIndex = self.startPicIndex;
            } else {
                self.stop();

                setTimeout(self.onComplete, 100);
            }
        }
    }
}