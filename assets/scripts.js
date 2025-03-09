
document.addEventListener("DOMContentLoaded", function () {
	
	//کانتینر اصلی
    const container = document.querySelector(".scroll-container");
    const content = document.querySelector(".content");
    const thumb = document.querySelector(".thumb");
    const scrollbar = document.querySelector(".custom-scrollbar");

    // محاسبه نسبت بین اسکرول و دسته اسکرول سفارشی
    function updateThumbPosition() {
        let scrollRatio = content.scrollTop / (content.scrollHeight - content.clientHeight);
        let thumbTop = scrollRatio * (container.clientHeight - thumb.clientHeight);
        thumb.style.top = thumbTop + "px";
    }

    // حرکت دسته اسکرول با اسکرول محتوا
    content.addEventListener("scroll", updateThumbPosition);

    // درگ کردن دسته اسکرول
    let isDragging = false;
    let startY, startScrollTop;

    thumb.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = content.scrollTop;
        document.body.style.userSelect = "none"; // جلوگیری از انتخاب متن
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let deltaY = e.clientY - startY;
        let scrollAmount = (deltaY / container.clientHeight) * content.scrollHeight;
        content.scrollTop = startScrollTop + scrollAmount;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "auto";
    });
});
