// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // 减去导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动时变色
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 这里可以添加实际的表单提交逻辑
        console.log('表单提交:', { name, email, message });
        
        // 显示成功消息（实际项目中应替换为真实提交）
        alert('感谢您的消息！我会尽快回复您。');
        
        // 重置表单
        contactForm.reset();
    });
}

// 添加动画效果到技能卡片
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// 滚动时显示动画效果
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.project-card, .profile-card, .contact-content > *').forEach(el => {
    el.classList.add('fade-element');
    fadeUpObserver.observe(el);
});

// 添加CSS类以实现淡入上滑动画
const style = document.createElement('style');
style.textContent = `
    .fade-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// 防止表单重复提交
let isSubmitting = false;

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '发送中...';
        
        // 模拟提交过程
        setTimeout(() => {
            alert('感谢您的消息！我会尽快回复您。');
            contactForm.reset();
            submitBtn.textContent = originalText;
            isSubmitting = false;
        }, 1500);
        
        e.preventDefault();
    });
}