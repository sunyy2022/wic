/*!
* Start Bootstrap - Modern Business v5.0.7 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// 同步背景图片和轮播
document.addEventListener('DOMContentLoaded', function() {
    const headerBackground = document.getElementById('headerBackground');
    const carousel = document.getElementById('headerCarousel');

    if (headerBackground && carousel) {
        // 设置初始背景
        const activeSlide = carousel.querySelector('.carousel-item.active');
        if (activeSlide) {
            const initialImage = activeSlide.dataset.bgImage;
            headerBackground.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${initialImage}') center/cover no-repeat`;
        }

        // 监听轮播切换
        carousel.addEventListener('slide.bs.carousel', function(event) {
            const nextImage = event.relatedTarget.dataset.bgImage;
            headerBackground.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${nextImage}') center/cover no-repeat`;
        });
    }
});