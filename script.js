// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用
    initApp();
});

// 全局变量
let currentPage = 'home';
let carouselIndex = 0;
let detailCarouselIndex = 0;
let carouselInterval;
let detailCarouselInterval;
let isLoading = false;
let currentProduct = null;
let cartItems = [];
let itemToDelete = null;

// 模拟商品数据
const products = [
    {
        id: 1,
        title: '2024新款春季连衣裙女装时尚气质中长款显瘦修身碎花裙子',
        price: 99.9,
        originalPrice: 199.9,
        sales: 1234,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=时尚女装连衣裙%2C碎花图案%2C春季新款%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=时尚女装连衣裙%2C碎花图案%2C春季新款%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=时尚女装连衣裙%2C侧面展示%2C春季新款%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=时尚女装连衣裙%2C细节展示%2C春季新款%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=女装连衣裙详情图1%2C面料展示%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=女装连衣裙详情图2%2C穿着效果%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=女装连衣裙详情图3%2C尺寸说明%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    },
    {
        id: 2,
        title: '无线蓝牙耳机运动跑步双耳入耳式隐形迷你超小耳塞式',
        price: 59.9,
        originalPrice: 129.9,
        sales: 5678,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=无线蓝牙耳机%2C入耳式%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=无线蓝牙耳机%2C入耳式%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=无线蓝牙耳机%2C充电盒%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=无线蓝牙耳机%2C细节展示%2C黑色%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=蓝牙耳机详情图1%2C功能介绍%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=蓝牙耳机详情图2%2C音质展示%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=蓝牙耳机详情图3%2C续航说明%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    },
    {
        id: 3,
        title: '男士休闲裤春季新款韩版潮流修身小脚裤百搭运动长裤',
        price: 79.9,
        originalPrice: 159.9,
        sales: 3456,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤%2C黑色%2C修身款式%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤%2C黑色%2C修身款式%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤%2C侧面展示%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤%2C细节展示%2C黑色%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤详情图1%2C面料展示%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤详情图2%2C穿着效果%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士休闲裤详情图3%2C尺寸说明%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    },
    {
        id: 4,
        title: '智能手表运动健康监测心率血压血氧多功能防水手环',
        price: 129.9,
        originalPrice: 299.9,
        sales: 8901,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表%2C黑色%2C运动款式%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表%2C黑色%2C运动款式%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表%2C界面展示%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表%2C细节展示%2C黑色%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表详情图1%2C功能介绍%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表详情图2%2C健康监测%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=智能手表详情图3%2C续航说明%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    },
    {
        id: 5,
        title: '护肤品套装补水保湿美白淡斑抗皱紧致面部护理化妆品',
        price: 199.9,
        originalPrice: 399.9,
        sales: 2345,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品套装%2C精美包装%2C粉色系%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品套装%2C精美包装%2C粉色系%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品套装%2C产品展示%2C粉色系%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品套装%2C使用效果%2C粉色系%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品详情图1%2C成分介绍%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品详情图2%2C使用方法%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=护肤品详情图3%2C效果展示%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    },
    {
        id: 6,
        title: '运动鞋男春季新款透气网面跑步鞋男士休闲旅游鞋子',
        price: 89.9,
        originalPrice: 189.9,
        sales: 6789,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士运动鞋%2C黑白配色%2C网面材质%2C高质量%2C专业摄影&image_size=square_hd',
        images: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士运动鞋%2C黑白配色%2C网面材质%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士运动鞋%2C侧面展示%2C黑白配色%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=男士运动鞋%2C细节展示%2C黑白配色%2C高质量%2C专业摄影&image_size=square_hd'
        ],
        detailImages: [
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=运动鞋详情图1%2C材质介绍%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=运动鞋详情图2%2C穿着效果%2C高质量%2C专业摄影&image_size=square_hd',
            'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=运动鞋详情图3%2C尺码说明%2C高质量%2C专业摄影&image_size=square_hd'
        ]
    }
];

// 初始化应用
function initApp() {
    // 初始化商品数据
    renderProducts();
    
    // 初始化购物车（模拟一些数据）
    initCart();
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化页面切换
    initPageNavigation();
    
    // 初始化下拉刷新
    initPullToRefresh();
    
    // 初始化无限滚动
    initInfiniteScroll();
    
    // 初始化商品详情页
    initProductDetail();
    
    // 初始化购物车功能
    initCartFunctionality();
    
    // 初始化模态框
    initModals();
    
    // 初始化按钮点击效果
    initButtonEffects();
}

// 渲染商品到瀑布流
function renderProducts() {
    const column1 = document.getElementById('column-1');
    const column2 = document.getElementById('column-2');
    
    // 清空现有内容
    column1.innerHTML = '';
    column2.innerHTML = '';
    
    // 交替将商品放入两列
    products.forEach((product, index) => {
        const productCard = createProductCard(product);
        
        if (index % 2 === 0) {
            column1.appendChild(productCard);
        } else {
            column2.appendChild(productCard);
        }
    });
}

// 创建商品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.dataset.productId = product.id;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">
                <span class="current-price">${product.price}</span>
                <span class="original-price">${product.originalPrice}</span>
            </div>
            <div class="product-sales">已拼${product.sales}件</div>
        </div>
    `;
    
    // 添加点击事件
    card.addEventListener('click', function() {
        openProductDetail(product);
    });
    
    return card;
}

// 初始化购物车
function initCart() {
    // 模拟一些购物车数据
    cartItems = [
        {
            id: 1,
            productId: 1,
            title: '2024新款春季连衣裙女装时尚气质中长款显瘦修身碎花裙子',
            price: 99.9,
            originalPrice: 199.9,
            quantity: 2,
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=时尚女装连衣裙%2C碎花图案%2C春季新款%2C高质量%2C专业摄影&image_size=square_hd',
            selected: true
        },
        {
            id: 2,
            productId: 2,
            title: '无线蓝牙耳机运动跑步双耳入耳式隐形迷你超小耳塞式',
            price: 59.9,
            originalPrice: 129.9,
            quantity: 1,
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=无线蓝牙耳机%2C入耳式%2C黑色%2C高质量%2C专业摄影&image_size=square_hd',
            selected: false
        }
    ];
    
    renderCart();
    updateCartBadge();
}

// 渲染购物车
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    // 清空现有内容
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        // 显示空购物车
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'flex';
        document.getElementById('cart-bottom-bar').style.display = 'none';
    } else {
        // 显示购物车商品
        cartItemsContainer.style.display = 'block';
        emptyCart.style.display = 'none';
        document.getElementById('cart-bottom-bar').style.display = 'flex';
        
        // 渲染每个购物车商品
        cartItems.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    
    updateCartSummary();
}

// 创建购物车商品元素
function createCartItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.dataset.itemId = item.id;
    
    itemElement.innerHTML = `
        <input type="checkbox" class="select-checkbox" ${item.selected ? 'checked' : ''}>
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-info">
            <h3 class="cart-item-title">${item.title}</h3>
            <div class="cart-item-price">
                <span class="cart-item-current-price">${item.price}</span>
                <span class="cart-item-original-price">${item.originalPrice}</span>
            </div>
            <div class="cart-item-quantity">
                <div class="quantity-controls">
                    <button class="quantity-btn quantity-minus" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn quantity-plus">+</button>
                </div>
                <button class="delete-item-btn">删除</button>
            </div>
        </div>
    `;
    
    // 添加事件监听器
    const checkbox = itemElement.querySelector('.select-checkbox');
    checkbox.addEventListener('change', function() {
        item.selected = this.checked;
        updateCartSummary();
        updateSelectAllCheckbox();
    });
    
    const minusBtn = itemElement.querySelector('.quantity-minus');
    minusBtn.addEventListener('click', function() {
        if (item.quantity > 1) {
            item.quantity--;
            updateQuantityDisplay(itemElement, item.quantity);
            updateCartSummary();
            updateCartBadge();
            
            // 添加动画效果
            const quantityValue = itemElement.querySelector('.quantity-value');
            quantityValue.classList.add('scale-in');
            setTimeout(() => {
                quantityValue.classList.remove('scale-in');
            }, 200);
        }
    });
    
    const plusBtn = itemElement.querySelector('.quantity-plus');
    plusBtn.addEventListener('click', function() {
        item.quantity++;
        updateQuantityDisplay(itemElement, item.quantity);
        updateCartSummary();
        updateCartBadge();
        
        // 添加动画效果
        const quantityValue = itemElement.querySelector('.quantity-value');
        quantityValue.classList.add('scale-in');
        setTimeout(() => {
            quantityValue.classList.remove('scale-in');
        }, 200);
    });
    
    const deleteBtn = itemElement.querySelector('.delete-item-btn');
    deleteBtn.addEventListener('click', function() {
        showDeleteConfirm(item.id);
    });
    
    return itemElement;
}

// 更新数量显示
function updateQuantityDisplay(itemElement, quantity) {
    const quantityValue = itemElement.querySelector('.quantity-value');
    const minusBtn = itemElement.querySelector('.quantity-minus');
    
    quantityValue.textContent = quantity;
    minusBtn.disabled = quantity <= 1;
}

// 更新购物车角标
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalQuantity > 0) {
        cartBadge.textContent = totalQuantity;
        cartBadge.style.display = 'block';
    } else {
        cartBadge.style.display = 'none';
    }
}

// 更新购物车汇总
function updateCartSummary() {
    const selectedItems = cartItems.filter(item => item.selected);
    const totalCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 更新全选按钮状态
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    selectAllCheckbox.checked = cartItems.length > 0 && cartItems.every(item => item.selected);
    
    // 更新结算按钮
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.textContent = `去结算(${totalCount})`;
    checkoutBtn.disabled = totalCount === 0;
    
    // 更新总价
    const totalValue = document.getElementById('cart-total');
    totalValue.textContent = totalPrice.toFixed(2);
}

// 更新全选复选框状态
function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    selectAllCheckbox.checked = cartItems.length > 0 && cartItems.every(item => item.selected);
}

// 显示删除确认
function showDeleteConfirm(itemId) {
    itemToDelete = itemId;
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.classList.add('active');
}

// 初始化轮播图
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = 4;
    
    // 自动轮播
    startCarousel();
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopCarousel();
    }, false);
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startCarousel();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // 左滑，下一张
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // 右滑，上一张
            prevSlide();
        }
    }
    
    // 指示器点击
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    function nextSlide() {
        carouselIndex = (carouselIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        carouselIndex = (carouselIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(index) {
        carouselIndex = index;
        updateCarousel();
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${carouselIndex * 100}%)`;
        
        // 更新指示器
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === carouselIndex);
        });
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 3000);
    }
    
    function stopCarousel() {
        clearInterval(carouselInterval);
    }
}

// 初始化页面切换
function initPageNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const bottomNav = document.querySelector('.bottom-nav');
    const detailBottomBar = document.getElementById('detail-bottom-bar');
    const cartBottomBar = document.getElementById('cart-bottom-bar');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const pageName = this.dataset.page;
            switchPage(pageName);
        });
    });
    
    function switchPage(pageName) {
        // 更新导航项状态
        navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });
        
        // 更新页面显示
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 隐藏所有底部栏
        bottomNav.style.display = 'flex';
        detailBottomBar.style.display = 'none';
        cartBottomBar.style.display = 'none';
        
        // 显示对应页面
        if (pageName === 'home') {
            document.getElementById('home-page').classList.add('active');
            currentPage = 'home';
        } else if (pageName === 'cart') {
            document.getElementById('cart-page').classList.add('active');
            cartBottomBar.style.display = cartItems.length > 0 ? 'flex' : 'none';
            currentPage = 'cart';
        } else {
            // 其他页面暂时显示首页
            document.getElementById('home-page').classList.add('active');
            currentPage = 'home';
        }
    }
    
    // 购物车图标点击事件
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.parentElement.addEventListener('click', function() {
        switchPage('cart');
    });
    
    // 去逛逛按钮
    const goShoppingBtn = document.getElementById('go-shopping-btn');
    goShoppingBtn.addEventListener('click', function() {
        switchPage('home');
    });
    
    // 全选复选框
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    selectAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        cartItems.forEach(item => {
            item.selected = isChecked;
        });
        
        // 更新所有复选框
        const checkboxes = document.querySelectorAll('.cart-item .select-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        
        updateCartSummary();
    });
    
    // 结算按钮
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        alert('结算功能开发中...');
    });
    
    // 编辑按钮
    const editCartBtn = document.getElementById('edit-cart-btn');
    editCartBtn.addEventListener('click', function() {
        if (this.textContent === '编辑') {
            this.textContent = '完成';
            // 可以添加编辑模式的逻辑
        } else {
            this.textContent = '编辑';
            // 退出编辑模式
        }
    });
}

// 初始化下拉刷新
function initPullToRefresh() {
    const homePage = document.getElementById('home-page');
    const pullRefresh = document.getElementById('pull-refresh');
    let startY = 0;
    let isPulling = false;
    
    homePage.addEventListener('touchstart', function(e) {
        if (window.scrollY === 0) {
            startY = e.touches[0].pageY;
            isPulling = true;
        }
    });
    
    homePage.addEventListener('touchmove', function(e) {
        if (!isPulling) return;
        
        const currentY = e.touches[0].pageY;
        const diff = currentY - startY;
        
        if (diff > 0 && diff < 100) {
            pullRefresh.style.display = 'flex';
            pullRefresh.style.height = `${diff}px`;
            
            const refreshText = pullRefresh.querySelector('.refresh-text');
            if (diff > 60) {
                refreshText.textContent = '释放刷新';
            } else {
                refreshText.textContent = '下拉刷新';
            }
        }
    });
    
    homePage.addEventListener('touchend', function() {
        if (!isPulling) return;
        
        const height = parseInt(pullRefresh.style.height) || 0;
        
        if (height > 60) {
            // 执行刷新
            pullRefresh.querySelector('.refresh-text').textContent = '刷新中...';
            
            setTimeout(function() {
                // 模拟刷新完成
                renderProducts();
                pullRefresh.style.display = 'none';
                pullRefresh.style.height = '0px';
                pullRefresh.querySelector('.refresh-text').textContent = '下拉刷新';
            }, 1000);
        } else {
            // 收起
            pullRefresh.style.display = 'none';
            pullRefresh.style.height = '0px';
        }
        
        isPulling = false;
    });
}

// 初始化无限滚动
function initInfiniteScroll() {
    const loadMore = document.getElementById('load-more');
    
    window.addEventListener('scroll', function() {
        if (isLoading) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            // 到达底部，加载更多
            loadMore.style.display = 'flex';
            isLoading = true;
            
            // 模拟加载更多
            setTimeout(function() {
                // 这里可以添加更多商品
                // 暂时只显示加载完成
                loadMore.style.display = 'none';
                isLoading = false;
            }, 1500);
        }
    });
}

// 初始化商品详情页
function initProductDetail() {
    const backBtn = document.getElementById('back-btn');
    const favoriteBtn = document.getElementById('favorite-btn');
    const singleBuyBtn = document.getElementById('single-buy-btn');
    const groupBuyBtn = document.getElementById('group-buy-btn');
    
    // 返回按钮
    backBtn.addEventListener('click', function() {
        closeProductDetail();
    });
    
    // 收藏按钮
    favoriteBtn.addEventListener('click', function() {
        const icon = this.querySelector('.favorite-icon');
        icon.classList.toggle('active');
        
        // 添加动画效果
        this.classList.add('scale-in');
        setTimeout(() => {
            this.classList.remove('scale-in');
        }, 200);
    });
    
    // 单独购买按钮
    singleBuyBtn.addEventListener('click', function() {
        if (currentProduct) {
            addToCart(currentProduct);
            alert('已添加到购物车！');
        }
    });
    
    // 发起拼单按钮
    groupBuyBtn.addEventListener('click', function() {
        if (currentProduct) {
            addToCart(currentProduct);
            alert('已添加到购物车，快去邀请好友拼单吧！');
        }
    });
    
    // 分享按钮
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', function() {
        alert('分享功能开发中...');
    });
}

// 打开商品详情页
function openProductDetail(product) {
    currentProduct = product;
    
    // 更新页面内容
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('detail-original-price').textContent = product.originalPrice;
    document.getElementById('detail-sales').textContent = `已拼${product.sales}件`;
    
    // 初始化详情页轮播图
    initDetailCarousel(product.images);
    
    // 渲染详情图片
    renderDetailImages(product.detailImages);
    
    // 显示详情页
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('cart-page').classList.remove('active');
    document.getElementById('detail-page').classList.add('active');
    
    // 显示详情页底部栏，隐藏其他底部栏
    document.querySelector('.bottom-nav').style.display = 'none';
    document.getElementById('detail-bottom-bar').style.display = 'flex';
    document.getElementById('cart-bottom-bar').style.display = 'none';
    
    currentPage = 'detail';
    
    // 重置收藏状态
    const favoriteIcon = document.querySelector('.favorite-icon');
    favoriteIcon.classList.remove('active');
}

// 关闭商品详情页
function closeProductDetail() {
    document.getElementById('detail-page').classList.remove('active');
    document.getElementById('home-page').classList.add('active');
    
    // 显示底部导航，隐藏详情页底部栏
    document.querySelector('.bottom-nav').style.display = 'flex';
    document.getElementById('detail-bottom-bar').style.display = 'none';
    
    currentPage = 'home';
    
    // 停止详情页轮播
    if (detailCarouselInterval) {
        clearInterval(detailCarouselInterval);
    }
}

// 初始化详情页轮播图
function initDetailCarousel(images) {
    const detailCarousel = document.getElementById('detail-carousel');
    const indicatorsContainer = document.getElementById('detail-carousel-indicators');
    
    // 清空现有内容
    detailCarousel.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    
    // 创建轮播项
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'detail-carousel-item';
        item.innerHTML = `<img src="${image}" alt="商品图片${index + 1}">`;
        detailCarousel.appendChild(item);
        
        // 添加点击事件用于放大预览
        item.addEventListener('click', function() {
            openImagePreview(image);
        });
        
        // 创建指示器
        const indicator = document.createElement('span');
        indicator.className = `detail-indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', function() {
            goToDetailSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    // 重置索引
    detailCarouselIndex = 0;
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    detailCarousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopDetailCarousel();
    }, false);
    
    detailCarousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleDetailSwipe();
        startDetailCarousel();
    }, false);
    
    function handleDetailSwipe() {
        const totalSlides = images.length;
        if (touchEndX < touchStartX - 50) {
            // 左滑，下一张
            detailCarouselIndex = (detailCarouselIndex + 1) % totalSlides;
            updateDetailCarousel();
        }
        if (touchEndX > touchStartX + 50) {
            // 右滑，上一张
            detailCarouselIndex = (detailCarouselIndex - 1 + totalSlides) % totalSlides;
            updateDetailCarousel();
        }
    }
    
    function goToDetailSlide(index) {
        detailCarouselIndex = index;
        updateDetailCarousel();
    }
    
    function updateDetailCarousel() {
        detailCarousel.style.transform = `translateX(-${detailCarouselIndex * 100}%)`;
        
        // 更新指示器
        const indicators = document.querySelectorAll('.detail-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === detailCarouselIndex);
        });
    }
    
    function startDetailCarousel() {
        detailCarouselInterval = setInterval(function() {
            const totalSlides = images.length;
            detailCarouselIndex = (detailCarouselIndex + 1) % totalSlides;
            updateDetailCarousel();
        }, 4000);
    }
    
    function stopDetailCarousel() {
        clearInterval(detailCarouselInterval);
    }
    
    // 开始自动轮播
    startDetailCarousel();
}

// 渲染详情图片
function renderDetailImages(images) {
    const detailImagesContainer = document.getElementById('detail-images');
    
    // 清空现有内容
    detailImagesContainer.innerHTML = '';
    
    // 创建图片项
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'detail-image-item';
        item.innerHTML = `<img src="${image}" alt="详情图片${index + 1}">`;
        
        // 添加点击事件用于放大预览
        item.addEventListener('click', function() {
            openImagePreview(image);
        });
        
        detailImagesContainer.appendChild(item);
    });
}

// 添加到购物车
function addToCart(product) {
    // 检查购物车中是否已有该商品
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
        // 已有该商品，增加数量
        existingItem.quantity++;
    } else {
        // 新增商品
        const newItem = {
            id: cartItems.length + 1,
            productId: product.id,
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
            image: product.image,
            selected: true
        };
        cartItems.push(newItem);
    }
    
    // 更新购物车显示
    renderCart();
    updateCartBadge();
}

// 初始化购物车功能
function initCartFunctionality() {
    // 购物车功能已经在 initCart 和 renderCart 中实现
}

// 初始化模态框
function initModals() {
    const imagePreviewModal = document.getElementById('image-preview-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    // 关闭图片预览模态框
    modalClose.addEventListener('click', function() {
        imagePreviewModal.classList.remove('active');
    });
    
    // 点击模态框背景关闭图片预览
    imagePreviewModal.addEventListener('click', function(e) {
        if (e.target === this) {
            imagePreviewModal.classList.remove('active');
        }
    });
    
    // 取消删除
    cancelBtn.addEventListener('click', function() {
        confirmModal.classList.remove('active');
        itemToDelete = null;
    });
    
    // 确认删除
    confirmDeleteBtn.addEventListener('click', function() {
        if (itemToDelete !== null) {
            // 找到要删除的商品元素并添加删除动画
            const itemElement = document.querySelector(`.cart-item[data-item-id="${itemToDelete}"]`);
            if (itemElement) {
                itemElement.classList.add('deleting');
                
                // 动画结束后删除
                setTimeout(() => {
                    // 从数组中删除
                    cartItems = cartItems.filter(item => item.id !== itemToDelete);
                    
                    // 重新渲染购物车
                    renderCart();
                    updateCartBadge();
                    
                    // 关闭模态框
                    confirmModal.classList.remove('active');
                    itemToDelete = null;
                }, 300);
            }
        }
    });
    
    // 点击确认模态框背景取消
    confirmModal.addEventListener('click', function(e) {
        if (e.target === this) {
            confirmModal.classList.remove('active');
            itemToDelete = null;
        }
    });
}

// 打开图片预览
function openImagePreview(imageSrc) {
    const previewImage = document.getElementById('preview-image');
    const imagePreviewModal = document.getElementById('image-preview-modal');
    
    previewImage.src = imageSrc;
    imagePreviewModal.classList.add('active');
}

// 初始化按钮点击效果
function initButtonEffects() {
    const buttons = document.querySelectorAll('button, .nav-item, .category-item, .product-card, .detail-action-item');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('btn-active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('btn-active');
        });
        
        // 同时支持鼠标点击
        button.addEventListener('mousedown', function() {
            this.classList.add('btn-active');
        });
        
        button.addEventListener('mouseup', function() {
            this.classList.remove('btn-active');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-active');
        });
    });
}
