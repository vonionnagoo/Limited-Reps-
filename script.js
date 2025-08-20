// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Dynamic Subcategory Loading for Contact Form
const productCategory = document.getElementById('productCategory');
const productSubcategory = document.getElementById('productSubcategory');

const subcategories = {
    shoes: [
        'Air Jordan',
        'Luxury Brand',
        'Fashion Brands',
        'Basketball Shoes',
        'NIKE',
        'Adidas',
        'Balenciaga',
        'New Balance'
    ],
    clothes: [
        'Luxury Brand',
        'Fashion Brand',
        'Down Jacket',
        'Baseball Jacket',
        'Windbreaker',
        'T-Shirt',
        'Polo Shirts',
        'Long Sleeve',
        'Track Suit',
        'Shorts',
        'Pants',
        'Hoodies/Sweatshirts',
        'Sweater'
    ],
    watches: [
        'Rolex',
        'Cartier',
        'Omega',
        'Patek Philippe',
        'Audemars Piguet',
        'Hublot',
        'Tag Heuer',
        'Breitling'
    ],
    bags: [
        'Louis Vuitton',
        'Gucci',
        'Chanel',
        'Hermès',
        'Prada',
        'Fendi',
        'Balenciaga',
        'Saint Laurent'
    ],
    accessories: [
        'Belts',
        'Wallets',
        'Hats',
        'Scarves',
        'Gloves',
        'Umbrellas',
        'Phone Cases'
    ],
    jewelry: [
        'Necklaces',
        'Bracelets',
        'Rings',
        'Earrings',
        'Pendants',
        'Chains'
    ],
    sunglasses: [
        'Ray-Ban',
        'Gucci',
        'Prada',
        'Tom Ford',
        'Dior',
        'Chanel',
        'Versace'
    ],
    belts: [
        'Louis Vuitton',
        'Gucci',
        'Hermès',
        'Prada',
        'Bottega Veneta',
        'Saint Laurent'
    ],
    wallets: [
        'Louis Vuitton',
        'Gucci',
        'Chanel',
        'Prada',
        'Bottega Veneta',
        'Saint Laurent'
    ],
    hats: [
        'New Era',
        'Nike',
        'Adidas',
        'Supreme',
        'Bape',
        'Off-White'
    ],
    scarves: [
        'Hermès',
        'Gucci',
        'Burberry',
        'Louis Vuitton',
        'Chanel',
        'Prada'
    ],
    perfumes: [
        'Chanel',
        'Dior',
        'Gucci',
        'Tom Ford',
        'Yves Saint Laurent',
        'Versace'
    ]
};

// Only add event listener if contact form elements exist
if (productCategory && productSubcategory) {
    productCategory.addEventListener('change', function() {
        const selectedCategory = this.value;
        const customProductGroup = document.getElementById('customProductGroup');
        
        // Reset subcategory
        productSubcategory.innerHTML = '<option value="">Select Subcategory</option>';
        
        // Show/hide custom product field
        if (selectedCategory === 'other') {
            if (customProductGroup) {
                customProductGroup.style.display = 'block';
                productSubcategory.style.display = 'none';
            }
        } else {
            if (customProductGroup) {
                customProductGroup.style.display = 'none';
                productSubcategory.style.display = 'block';
            }
            
            // Populate subcategories
            if (selectedCategory && subcategories[selectedCategory]) {
                subcategories[selectedCategory].forEach(subcat => {
                    const option = document.createElement('option');
                    option.value = subcat;
                    option.textContent = subcat;
                    productSubcategory.appendChild(option);
                });
            }
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.fullName || !data.email || !data.phone || !data.address) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return;
        }
        
        // Format message for WhatsApp
        const whatsappMessage = formatWhatsAppMessage(data);
        
        // Format message for email
        const emailMessage = formatEmailMessage(data);
        
        // Send to WhatsApp
        if (data.contactMethod === 'whatsapp') {
            sendToWhatsApp(whatsappMessage);
        }
        
        // Send to email (using mailto)
        sendToEmail(emailMessage, data);
        
        // Show success message
        showNotification('Message sent successfully! Check your WhatsApp and email.', 'success');
        
        // Reset form
        this.reset();
        if (productSubcategory) {
            productSubcategory.innerHTML = '<option value="">Select Subcategory</option>';
        }
    });
}

function formatWhatsAppMessage(data) {
    let productInfo = '';
    
    if (data.productCategory === 'other') {
        productInfo = `• Category: Custom Request
• Custom Product: ${data.customProduct || 'Not specified'}`;
    } else {
        productInfo = `• Category: ${data.productCategory || 'Not specified'}
• Subcategory: ${data.productSubcategory || 'Not specified'}
• Specific Product: ${data.specificProduct || 'Not specified'}`;
    }
    
    return `*New Customer Inquiry - Limited Reps* 🚀

*Personal Information:*
• Name: ${data.fullName}
• Email: ${data.email}
• Phone: ${data.phone}
• Address: ${data.address}

*Product Information:*
${productInfo}
• Size: ${data.size || 'Not specified'}
• Quantity: ${data.quantity || '1'}

*Additional Details:*
• Budget: ${data.budget || 'Not specified'}
• Additional Info: ${data.additionalInfo || 'None'}
• Preferred Contact: ${data.contactMethod}

---
*This message was sent from the Limited Reps website* 🌐`;
}

function formatEmailMessage(data) {
    let productInfo = '';
    
    if (data.productCategory === 'other') {
        productInfo = `- Category: Custom Request
- Custom Product: ${data.customProduct || 'Not specified'}`;
    } else {
        productInfo = `- Category: ${data.productCategory || 'Not specified'}
- Subcategory: ${data.productSubcategory || 'Not specified'}
- Specific Product: ${data.specificProduct || 'Not specified'}`;
    }
    
    return `New Customer Inquiry - Limited Reps 🚀

Personal Information:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Address: ${data.address}

Product Information:
${productInfo}
- Size: ${data.size || 'Not specified'}
- Quantity: ${data.quantity || '1'}

Additional Details:
- Budget: ${data.budget || 'Not specified'}
- Additional Info: ${data.additionalInfo || 'None'}
- Preferred Contact: ${data.contactMethod}

---
This message was sent from the Limited Reps website 🌐`;
}

function sendToWhatsApp(message) {
    const phoneNumber = '15106609281'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

function sendToEmail(message, data) {
    const subject = 'New Customer Inquiry - Limited Reps 🚀';
    const body = message;
    const email = 'limitedrepsinformation@gmail.com';
    
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoURL;
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88, #00cc6a)' : type === 'error' ? 'linear-gradient(135deg, #ff4757, #ff3742)' : 'linear-gradient(135deg, #00a8ff, #0097e6)'};
        color: ${type === 'success' ? '#000000' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Category dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
            dropdownBtn.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('show');
                dropdownBtn.classList.remove('active');
            }
        });
        
        // Handle dropdown item clicks
        dropdownContent.addEventListener('click', function(event) {
            if (event.target.classList.contains('dropdown-item')) {
                dropdownContent.classList.remove('show');
                dropdownBtn.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.15)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card, .category-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Form validation enhancement
function validateForm() {
    if (!contactForm) return true;
    
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff4757';
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(0, 255, 136, 0.2)';
        }
    });
    
    return isValid;
}

// Add real-time validation
if (contactForm) {
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4757';
            } else {
                this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 71, 87)') {
                this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
            }
        });
    });
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Enhanced brand animation
document.addEventListener('DOMContentLoaded', function() {
    const brandItems = document.querySelectorAll('.brand-item');
    const categoryItems = document.querySelectorAll('.category-item');
    
    brandItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    categoryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add parallax effect to hero section
// Disable parallax to keep video fixed and visible
// and avoid overlap/merging with content when scrolling
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = 'translateY(0)';
    }
});

// Product Details routing: on products page, route to product.html with slug
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    if (!productCards.length) return;

    productCards.forEach(card => {
        const titleEl = card.querySelector('.product-info h4');
        const btn = card.querySelector('.btn-details');
        if (!titleEl || !btn) return;
        const name = (titleEl.textContent || '').trim();
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `product.html?model=${encodeURIComponent(slug)}`;
        });
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Load local product images from /images folder with extension fallbacks and animation
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    if (!productCards.length) return;

    const extensionsToTry = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG', 'webp', 'WEBP'];

    const buildNameVariants = (rawName) => {
        if (!rawName) return [];
        const name = rawName.trim();
        const lower = name.toLowerCase();
        const alnum = lower.replace(/[^a-z0-9\s\-_.]/g, '').trim();
        return [
            name,
            lower,
            alnum,
            alnum.replace(/\s+/g, '-'),
            alnum.replace(/\s+/g, '_'),
            alnum.replace(/\s+/g, '')
        ].filter((v, i, arr) => v && arr.indexOf(v) === i);
    };

    const trySetLocalImage = (imgEl, baseNames) => {
        return new Promise((resolve) => {
            let resolved = false;
            const names = Array.isArray(baseNames) ? baseNames : [baseNames];
            let i = 0, j = 0;

            const tryNext = () => {
                if (i >= names.length) return resolve(false);
                const name = names[i];
                const ext = extensionsToTry[j];
                const candidate = `images/${encodeURIComponent(name)}.${ext}`;

                const testImg = new Image();
                testImg.onload = () => {
                    if (resolved) return;
                    resolved = true;
                    imgEl.src = candidate;
                    imgEl.classList.add('local-loaded');
                    resolve(true);
                };
                testImg.onerror = () => {
                    j++;
                    if (j >= extensionsToTry.length) {
                        j = 0; i++;
                    }
                    tryNext();
                };
                testImg.src = candidate;
            };

            tryNext();
        });
    };

    productCards.forEach(async (card) => {
        const titleEl = card.querySelector('.product-info h4, .product-info h3');
        const imgEl = card.querySelector('.product-image img, img');
        if (!titleEl || !imgEl) return;

        const rawTitle = (titleEl.textContent || '').replace(/\s+/g, ' ').trim();
        const altTitle = (imgEl.getAttribute('alt') || '').replace(/\s+/g, ' ').trim();

        // Find brand/category name from the surrounding section title if available
        let brandName = '';
        const section = card.closest('.category-section');
        if (section) {
            const catTitleEl = section.querySelector('.category-title');
            if (catTitleEl) {
                brandName = (catTitleEl.textContent || '').replace(/\s+/g, ' ').trim();
            }
        }

        const baseCandidates = new Set([
            rawTitle,
            altTitle,
            brandName ? `${brandName} ${rawTitle}` : '',
            brandName ? `${rawTitle} ${brandName}` : '',
            brandName ? `${brandName}` : ''
        ].filter(Boolean));

        // Build name variants for each base candidate
        const allVariants = [];
        baseCandidates.forEach((name) => {
            buildNameVariants(name).forEach((v) => allVariants.push(v));
        });

        await trySetLocalImage(imgEl, allVariants);
    });
});
