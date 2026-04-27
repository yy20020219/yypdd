// 全局状态
const state = {
    currentPage: 'home',
    homeCarouselIndex: 0,
    detailCarouselIndex: 0,
    cartItems: [
        {
            id: 1,
            title: '新款时尚休闲运动鞋 舒适透气 百搭潮流',
            price: 99.9,
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E8%BF%90%E5%8A%A8%E9%9E%8B%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd',
            quantity: 1
        },
        {
            id: 2,
            title: '夏季新款纯棉短袖T恤 简约百搭 舒适透气',
            price: 29.9,
            image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=T%E6%81%A4%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd',
            quantity: 2
        }
    ],
    products: [],
    isLoading: false,
    hasMore: true,
    itemToDelete: null,
    autoPlayTimer: null
};

// 模拟商品数据
const mockProducts = [
    {
        id: 1,
        title: '新款时尚休闲运动鞋 舒适透气 百搭潮流 适合跑步健身',
        price: 99.9,
        sold: '10万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E8%BF%90%E5%8A%A8%E9%9E%8B%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 2,
        title: '夏季新款纯棉短袖T恤 简约百搭 舒适透气 多色可选',
        price: 29.9,
        sold: '5万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=T%E6%81%A4%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 3,
        title: '便携式蓝牙耳机 高清音质 超长续航 舒适佩戴',
        price: 59.9,
        sold: '8万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E8%93%9D%E7%89%99%E8%80%B3%E6%9C%BA%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 4,
        title: '时尚双肩背包 大容量 防水耐磨 多功能收纳',
        price: 79.9,
        sold: '3万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E8%83%8C%E5%8C%85%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 5,
        title: '智能手表 健康监测 运动追踪 多功能提醒',
        price: 199.9,
        sold: '2万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E6%99%BA%E8%83%BD%E6%89%8B%E8%A1%A8%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 6,
        title: '夏季遮阳帽 防晒透气 时尚百搭 可调节大小',
        price: 19.9,
        sold: '15万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E9%98%B3%E5%85%89%E5%B8%BD%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 7,
        title: '便携充电宝 大容量 快充 多接口 轻薄设计',
        price: 49.9,
        sold: '6万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%85%85%E7%94%B5%E5%AE%9D%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    },
    {
        id: 8,
        title: '时尚太阳镜 防紫外线 高清镜片 多款式可选',
        price: 39.9,
        sold: '4万+',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=%E5%A4%AA%E9%98%B3%E9%95%9C%E5%95%86%E5%93%81%E5%9B%BE%E7%89%87%EF%BC%8C%E7%99%BD%E8%89%B2%E8%83%8C%E6%99%AF%EF%BC%8C%E9%AB%98%E6%B8%85%E5%BA%A6%E4%BA%A7%E5%93%81%E7%85%A7%E7%89%87&image_size=square_hd'
    }
];

// DOM元素
const elements = {
    homePage: document.getElementById('home-page'),
    detailPage: document.getElementById('detail-page'),
    bottomNav: document.getElementById('bottom-nav'),
    navItems: document.querySelectorAll('.nav-item'),
    col1: document.getElementById('col1'),
    col2: document.getElementById('col2'),
    loadMore: document.getElementById('load-more'),
    cartBadge: document.getElementById('cart-badge'),
    cartModal: document.getElementById('cart-modal'),
    cartItems: document.getElementById('cart-items'),
    cartClose: document.getElementById('cart-close'),
    deleteModal: document.getElementById('delete-modal'),
    cancelDelete: document.getElementById('cancel-delete'),
    confirmDelete: document.getElementById('confirm-delete'),
    backBtn: document.getElementById('back-btn'),
    shareBtn: document.getElementById('share-btn'),
    homeCarousel: document.getElementById('home-carousel'),
    homeCarouselWrapper: document.querySelector('#home-carousel .carousel-wrapper'),
    homeIndicators: document.querySelectorAll('#home-carousel .indicator'),
    detailCarousel: document.getElementById('detail-carousel'),
    detailCarouselWrapper: document.querySelector('#detail-carousel .detail-carousel-wrapper'),
    detailCurrent: document.getElementById('detail-current'),
    detailTotal: document.getElementById('detail-total')
};

// 初始化函数
function init() {
    renderProducts();
    updateCartBadge();
    bindEvents();
    startAutoPlay();
}

// 渲染商品到瀑布流
function renderProducts(append = false) {
    if (state.isLoading || !state.hasMore) return;
    
    state.isLoading = true;
    elements.loadMore.style.display = 'block';
    elements.loadMore.textContent = '加载中...';
    
    // 模拟网络请求延迟
    setTimeout(() => {
        const products = [...mockProducts];
        
        // 如果没有更多数据，显示"没有更多了"
        if (state.products.length >= 24) {
            state.hasMore = false;
            elements.loadMore.textContent = '没有更多了';
            state.isLoading = false;
            return;
        }
        
        // 添加商品
        const startIndex = state.products.length % products.length;
        const newProducts = [];
        
        for (let i = 0; i < 4; i++) {
            const index = (startIndex + i) % products.length;
            const product = {
                ...products[index],
                id: state.products.length + i + 1
            };
            newProducts.push(product);
        }
        
        state.products = [...state.products, ...newProducts];
        
        // 分配到两列
        newProducts.forEach((product, index) => {
            const card = createProductCard(product);
            if (index % 2 === 0) {
                elements.col1.appendChild(card);
            } else {
                elements.col2.appendChild(card);
            }
        });
        
        state.isLoading = false;
        
        if (state.products.length >= 24) {
            state.hasMore = false;
            elements.loadMore.textContent = '没有更多了';
        }
    }, 800);
}

// 创建商品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card slide-up';
    card.dataset.id = product.id;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price-row">
                <span class="product-price">${product.price}</span>
            </div>
            <span class="product-sold">已拼${product.sold}件</span>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showDetailPage(product);
    });
    
    return card;
}

// 显示商品详情页
function showDetailPage(product) {
    // 更新详情页标题
    document.querySelector('.detail-title').textContent = product.title;
    
    // 更新价格信息
    document.querySelector('.current-price').textContent = product.price;
    document.querySelector('.sold-count').textContent = `已拼${product.sold}件`;
    
    // 切换页面
    elements.homePage.classList.remove('active');
    elements.detailPage.classList.add('active');
    elements.bottomNav.style.display = 'none';
    
    // 重置详情页轮播
    state.detailCarouselIndex = 0;
    updateDetailCarousel();
    
    // 停止首页轮播自动播放
    stopAutoPlay();
}

// 显示首页
function showHomePage() {
    elements.detailPage.classList.remove('active');
    elements.homePage.classList.add('active');
    elements.bottomNav.style.display = 'flex';
    
    // 恢复首页轮播自动播放
    startAutoPlay();
}

// 绑定事件
function bindEvents() {
    // 底部Tab导航
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            switchTab(page);
        });
    });
    
    // 购物车图标
    const cartIcon = document.querySelector('.header-actions .action-item:last-child');
    cartIcon.addEventListener('click', () => {
        showCartModal();
    });
    
    // 关闭购物车弹窗
    elements.cartClose.addEventListener('click', () => {
        hideCartModal();
    });
    
    // 点击遮罩关闭购物车
    elements.cartModal.addEventListener('click', (e) => {
        if (e.target === elements.cartModal) {
            hideCartModal();
        }
    });
    
    // 删除确认
    elements.cancelDelete.addEventListener('click', () => {
        hideDeleteModal();
    });
    
    elements.confirmDelete.addEventListener('click', () => {
        confirmDeleteItem();
    });
    
    // 点击遮罩关闭删除确认
    elements.deleteModal.addEventListener('click', (e) => {
        if (e.target === elements.deleteModal) {
            hideDeleteModal();
        }
    });
    
    // 返回按钮
    elements.backBtn.addEventListener('click', () => {
        showHomePage();
    });
    
    // 分享按钮
    elements.shareBtn.addEventListener('click', () => {
        alert('分享功能开发中...');
    });
    
    // 无限滚动
    window.addEventListener('scroll', () => {
        if (state.currentPage !== 'home') return;
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= documentHeight - 100) {
            renderProducts();
        }
    });
    
    // 首页轮播触摸事件
    bindCarouselTouch(elements.homeCarousel, 'home');
    
    // 详情页轮播触摸事件
    bindCarouselTouch(elements.detailCarousel, 'detail');
    
    // 详情页按钮
    const btnAlone = document.querySelector('.btn-alone');
    const btnGroup = document.querySelector('.btn-group');
    
    btnAlone.addEventListener('click', () => {
        alert('单独购买功能开发中...');
    });
    
    btnGroup.addEventListener('click', () => {
        alert('发起拼单功能开发中...');
    });
    
    // 详情页底部操作
    const bottomActions = document.querySelectorAll('.bottom-action');
    bottomActions[1].addEventListener('click', () => {
        // 收藏按钮
        const icon = bottomActions[1].querySelector('.bottom-icon');
        if (icon.textContent === '❤️') {
            icon.textContent = '🤍';
        } else {
            icon.textContent = '❤️';
        }
    });
}

// 绑定轮播触摸事件
function bindCarouselTouch(container, type) {
    let startX = 0;
    let startY = 0;
    let moveX = 0;
    let moveY = 0;
    let isDragging = false;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
        
        if (type === 'home') {
            stopAutoPlay();
        }
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        moveX = e.touches[0].clientX - startX;
        moveY = e.touches[0].clientY - startY;
        
        // 横向滑动才处理
        if (Math.abs(moveX) > Math.abs(moveY)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    container.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const threshold = 50;
        
        if (type === 'home') {
            if (moveX > threshold && state.homeCarouselIndex > 0) {
                // 向右滑动，上一张
                state.homeCarouselIndex--;
            } else if (moveX < -threshold && state.homeCarouselIndex < 3) {
                // 向左滑动，下一张
                state.homeCarouselIndex++;
            }
            
            updateHomeCarousel();
            startAutoPlay();
        } else if (type === 'detail') {
            if (moveX > threshold && state.detailCarouselIndex > 0) {
                state.detailCarouselIndex--;
            } else if (moveX < -threshold && state.detailCarouselIndex < 2) {
                state.detailCarouselIndex++;
            }
            
            updateDetailCarousel();
        }
        
        moveX = 0;
        moveY = 0;
    });
}

// 更新首页轮播
function updateHomeCarousel() {
    const offset = -state.homeCarouselIndex * 100;
    elements.homeCarouselWrapper.style.transform = `translateX(${offset}%)`;
    
    // 更新指示器
    elements.homeIndicators.forEach((indicator, index) => {
        if (index === state.homeCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 更新详情页轮播
function updateDetailCarousel() {
    const offset = -state.detailCarouselIndex * 100;
    elements.detailCarouselWrapper.style.transform = `translateX(${offset}%)`;
    
    // 更新计数器
    elements.detailCurrent.textContent = state.detailCarouselIndex + 1;
}

// 开始自动播放
function startAutoPlay() {
    if (state.autoPlayTimer) {
        clearInterval(state.autoPlayTimer);
    }
    
    state.autoPlayTimer = setInterval(() => {
        state.homeCarouselIndex = (state.homeCarouselIndex + 1) % 4;
        updateHomeCarousel();
    }, 3000);
}

// 停止自动播放
function stopAutoPlay() {
    if (state.autoPlayTimer) {
        clearInterval(state.autoPlayTimer);
        state.autoPlayTimer = null;
    }
}

// 切换Tab
function switchTab(page) {
    if (page === state.currentPage) return;
    
    // 更新导航状态
    elements.navItems.forEach(item => {
        if (item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    state.currentPage = page;
    
    // 这里只实现了首页，其他Tab可以扩展
    if (page === 'home') {
        elements.homePage.classList.add('active');
    } else {
        // 其他Tab显示提示
        alert(`${getTabName(page)}功能开发中...`);
    }
}

// 获取Tab名称
function getTabName(page) {
    const names = {
        home: '首页',
        category: '分类',
        circle: '拼小圈',
        chat: '聊天',
        profile: '个人中心'
    };
    return names[page] || page;
}

// 显示购物车弹窗
function showCartModal() {
    renderCartItems();
    updateTotalPrice();
    elements.cartModal.classList.add('active');
}

// 隐藏购物车弹窗
function hideCartModal() {
    elements.cartModal.classList.remove('active');
}

// 渲染购物车商品
function renderCartItems() {
    if (state.cartItems.length === 0) {
        elements.cartItems.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">购物车是空的</div>';
        return;
    }
    
    elements.cartItems.innerHTML = state.cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">${item.price}</span>
                    <div class="quantity-control">
                        <button class="quantity-btn quantity-decrease" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn quantity-increase" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
            <span class="cart-item-delete" data-id="${item.id}">🗑️</span>
        </div>
    `).join('');
    
    // 绑定数量控制事件
    bindQuantityEvents();
    
    // 绑定删除事件
    bindDeleteEvents();
}

// 绑定数量控制事件
function bindQuantityEvents() {
    const decreaseBtns = document.querySelectorAll('.quantity-decrease');
    const increaseBtns = document.querySelectorAll('.quantity-increase');
    
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, -1);
        });
    });
    
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, 1);
        });
    });
}

// 绑定删除事件
function bindDeleteEvents() {
    const deleteBtns = document.querySelectorAll('.cart-item-delete');
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            showDeleteModal(id);
        });
    });
}

// 更新商品数量
function updateQuantity(id, change) {
    const item = state.cartItems.find(item => item.id === id);
    
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) return;
    if (newQuantity > 99) return;
    
    item.quantity = newQuantity;
    
    // 更新显示
    const quantityValue = document.querySelector(`.cart-item[data-id="${id}"] .quantity-value`);
    const decreaseBtn = document.querySelector(`.cart-item[data-id="${id}"] .quantity-decrease`);
    
    // 添加动画效果
    quantityValue.classList.add('quantity-change');
    setTimeout(() => {
        quantityValue.classList.remove('quantity-change');
    }, 300);
    
    quantityValue.textContent = newQuantity;
    
    // 更新减号按钮状态
    if (newQuantity <= 1) {
        decreaseBtn.disabled = true;
    } else {
        decreaseBtn.disabled = false;
    }
    
    // 更新总价和角标
    updateTotalPrice();
    updateCartBadge();
}

// 显示删除确认弹窗
function showDeleteModal(id) {
    state.itemToDelete = id;
    elements.deleteModal.classList.add('active');
}

// 隐藏删除确认弹窗
function hideDeleteModal() {
    state.itemToDelete = null;
    elements.deleteModal.classList.remove('active');
}

// 确认删除
function confirmDeleteItem() {
    if (state.itemToDelete === null) return;
    
    state.cartItems = state.cartItems.filter(item => item.id !== state.itemToDelete);
    
    // 重新渲染
    renderCartItems();
    updateTotalPrice();
    updateCartBadge();
    
    hideDeleteModal();
}

// 更新总价
function updateTotalPrice() {
    const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPriceElement = document.querySelector('.total-price .price');
    
    if (totalPriceElement) {
        totalPriceElement.textContent = total.toFixed(1);
    }
}

// 更新购物车角标
function updateCartBadge() {
    const totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalQuantity > 0) {
        elements.cartBadge.style.display = 'block';
        elements.cartBadge.textContent = totalQuantity > 99 ? '99+' : totalQuantity;
    } else {
        elements.cartBadge.style.display = 'none';
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);
