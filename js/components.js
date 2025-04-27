// Function to load header
function loadHeader() {
    // 确定基础路径
    // 检查当前页面的路径名是否包含 '/subpage/'
    const isSubpage = window.location.pathname.includes('/subpage/');
    // 如果是子页面 (isSubpage 为 true)，基础路径需要向上两级 ('../../')
    // 否则 (在根目录或其它非 /subpage/ 目录下)，基础路径是当前目录 ('./')
    const basePath = isSubpage ? '../../' : './';

    // --- Debugging Logs ---
    console.log('Current Pathname:', window.location.pathname); // 打印当前页面路径
    console.log('Is Subpage:', isSubpage);                     // 打印是否判断为子页面
    console.log('Calculated Base Path:', basePath);           // 打印计算出的基础路径
    // --- End Debugging Logs ---

    // 加载页头
    const headerUrl = `${basePath}components/header.html`;
    console.log('Attempting to fetch Header from:', headerUrl); // 打印尝试请求的页头URL
    fetch(headerUrl)
        .then(response => {
            if (!response.ok) {
                // 如果请求不成功 (例如 404), 抛出一个包含状态码和URL的错误
                throw new Error(`HTTP error! status: ${response.status}, fetching ${headerUrl}`);
            }
            return response.text(); // 成功则读取文本内容
        })
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data; // 插入页头内容
            } else {
                console.error('Error: Could not find element with ID "header-placeholder"');
            }
        })
        .catch(error => console.error('加载页头时出错 (Error loading header):', error)); // 捕获并打印加载过程中的任何错误

    // 加载页脚 (逻辑与页头类似)
    const footerUrl = `${basePath}components/footer.html`;
    console.log('Attempting to fetch Footer from:', footerUrl); // 打印尝试请求的页脚URL
    fetch(footerUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, fetching ${footerUrl}`);
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data; // 插入页脚内容
            } else {
                console.error('Error: Could not find element with ID "footer-placeholder"');
            }
        })
        .catch(error => console.error('加载页脚时出错 (Error loading footer):', error)); // 捕获并打印加载过程中的任何错误
}


// Function to load footer
function loadFooter() {
    // 确定基础路径
    const isSubpage = window.location.pathname.includes('/subpage/');
    const basePath = isSubpage ? '../../' : './';

    // --- Debugging Logs ---
    console.log('Current Pathname:', window.location.pathname);
    console.log('Is Subpage:', isSubpage);
    console.log('Calculated Base Path:', basePath);
    // --- End Debugging Logs ---

    // 加载页脚
    const footerUrl = `${basePath}components/footer.html`;
    console.log('Attempting to fetch Footer from:', footerUrl);
    fetch(footerUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, fetching ${footerUrl}`);
            }
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            } else {
                console.error('Error: Could not find element with ID "footer-placeholder"');
            }
        })
        .catch(error => console.error('加载页脚时出错 (Error loading footer):', error));
}


// Function to load sidebar
// Function to load sidebar
function loadSidebar() {
    const currentPagePath = window.location.pathname;
    console.log('Sidebar: Current path:', currentPagePath);

    // 检查是否为子页面
    const isSubpage = currentPagePath.includes('/subpage/');
    // 根据是否为子页面设置基础路径
    const relativePrefix = isSubpage ? '../../' : './';

    // --- Determine which sidebar to load ---
    let sidebarFileName = 'sidebar.html'; // Default sidebar
    let placeholderId = 'sidebar-placeholder'; // Default placeholder ID

    if (currentPagePath.includes('/subpage/cultural_experience/')) {
        sidebarFileName = 'cultural_sidebar.html';
        placeholderId = 'sidebar-placeholder'; // Assuming cultural uses the default placeholder
        console.log('Sidebar: Detected Cultural Experience page, loading cultural_sidebar.html');
    } else if (currentPagePath.includes('/subpage/food/')) { // Added condition for food pages
        sidebarFileName = 'food_sidebar.html';
        placeholderId = 'sidebar-placeholder'; // Assuming food uses the default placeholder
        console.log('Sidebar: Detected Food page, loading food_sidebar.html');
    } else if (currentPagePath.includes('/subpage/destination/')) { // Add this condition
        sidebarFileName = 'destination_sidebar.html';
        placeholderId = 'destination-sidebar-placeholder'; // *** Use the correct placeholder ID for destination pages ***
        console.log('Sidebar: Detected Destination page, loading destination_sidebar.html');
    } else if (currentPagePath.includes('/subpage/blogs/')) {
        // sidebarFileName = 'blog_sidebar.html'; // Example for blog pages
        // placeholderId = 'sidebar-placeholder'; // Assuming blogs use the default placeholder
        console.log('Sidebar: Detected Blog page, using default sidebar.html for now.');
    } else if (currentPagePath.includes('/subpage/survival_guide/')) {
        // sidebarFileName = 'survival_sidebar.html'; // Example for survival guide pages
        // placeholderId = 'sidebar-placeholder'; // Assuming survival guide uses the default placeholder
        console.log('Sidebar: Detected Survival Guide page, using default sidebar.html for now.');
    }
    // Add more conditions here for other sections if needed

    const sidebarPath = relativePrefix + 'components/' + sidebarFileName;
    // --- End Determine which sidebar ---

    console.log('Sidebar: Calculated depth:', isSubpage ? 3 : 1);
    console.log('Sidebar: Relative prefix:', relativePrefix);
    console.log('Sidebar: Attempting to fetch from:', sidebarPath);
    console.log('Sidebar: Target placeholder ID:', placeholderId); // Log the target ID

    fetch(sidebarPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} fetching ${sidebarPath}`);
            }
            return response.text();
        })
        .then(data => {
            // *** Use the determined placeholderId ***
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                placeholder.innerHTML = ''; // Clear existing content
                // Check if the first child of body exists and append it
                const sidebarContainer = doc.body && doc.body.firstChild;
                if (sidebarContainer && sidebarContainer.nodeType === Node.ELEMENT_NODE) { // Ensure it's an element
                    placeholder.appendChild(sidebarContainer.cloneNode(true)); // Append the actual sidebar div

                    // Script handling (if any scripts are inside the loaded sidebar HTML)
                    const scripts = placeholder.querySelectorAll('script');
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.textContent = oldScript.textContent;
                        if (oldScript.parentNode) {
                             oldScript.parentNode.replaceChild(newScript, oldScript);
                             console.log(`Sidebar: Replaced script tag from ${sidebarFileName} to trigger execution.`);
                        } else {
                             console.warn('Sidebar: Old script has no parent node?');
                        }
                    });

                    // --- Call the correct initialization function ---
                    if (sidebarFileName === 'cultural_sidebar.html' && typeof window.initializeCulturalSidebar === 'function') {
                        console.log('Sidebar: Calling initializeCulturalSidebar...');
                        window.initializeCulturalSidebar();
                    } else if (sidebarFileName === 'food_sidebar.html' && typeof window.initializeFoodSidebar === 'function') {
                        console.log('Sidebar: Calling initializeFoodSidebar...');
                        window.initializeFoodSidebar();
                    } else if (sidebarFileName === 'sidebar.html' && typeof window.initializeSidebar === 'function') {
                        console.log('Sidebar: Calling initializeSidebar (default)...');
                        window.initializeSidebar();
                    } else if (sidebarFileName === 'destination_sidebar.html') {
                        console.log(`Sidebar: Loaded ${sidebarFileName}. No specific initialization function needed.`);
                        // No specific function call needed as destination_sidebar.html is static
                    } else {
                        console.warn(`Sidebar: No specific initialization function found or needed for ${sidebarFileName}. The script within it might self-execute.`);
                    }
                    // --- End Call the correct initialization function ---

                } else {
                     console.error(`Could not parse sidebar content correctly or ${sidebarFileName} is empty/invalid. Parsed doc body:`, doc.body);
                     placeholder.innerHTML = `<div class='p-3 text-danger small'>Error loading sidebar structure from ${sidebarFileName}.</div>`;
                }
            } else {
                 // Use the correct placeholderId in the warning message
                 console.warn(`Sidebar placeholder with ID "${placeholderId}" not found on this page.`);
            }
        })
        .catch(error => {
            console.error(`Error loading sidebar (${sidebarFileName}):`, error);
            // Use the correct placeholderId in the error message
            const placeholder = document.getElementById(placeholderId);
            if(placeholder) {
                placeholder.innerHTML = `<div class='p-3 text-danger small'>Failed to load sidebar component (${sidebarFileName}). Check console.</div>`;
            }
        });
}

// Function to load a component
function loadComponent(componentPath, placeholderId) {
    // Assuming this function fetches and inserts HTML similar to loadHeader/Footer
    const isSubpage = window.location.pathname.includes('/subpage/');
    const basePath = isSubpage ? '../../' : './';
    const fullPath = basePath + componentPath.replace(/^\.\//, '').replace(/^\.\.\//, ''); // Adjust path based on basePath

    console.log(`loadComponent: Attempting to fetch ${componentPath} (resolved to ${fullPath}) for placeholder ${placeholderId}`);

    fetch(fullPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, fetching ${fullPath}`);
            }
            return response.text();
        })
        .then(data => {
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.innerHTML = data;
                console.log(`loadComponent: Successfully loaded ${componentPath} into #${placeholderId}`);
            } else {
                console.error(`loadComponent: Error - Could not find element with ID "${placeholderId}"`);
            }
        })
        .catch(error => console.error(`loadComponent: Error loading ${componentPath}:`, error));
}

// --- REMOVE OR COMMENT OUT THIS SECTION ---
/*
// Load header and footer (existing calls) - These might be redundant if loadHeader/loadFooter are called in DOMContentLoaded
// loadComponent('../../components/header.html', 'header-placeholder'); // Adjust path based on file location
// loadComponent('../../components/footer.html', 'footer-placeholder'); // Adjust path based on file location

// Load the appropriate sidebar - THIS IS REDUNDANT as loadSidebar() is called in DOMContentLoaded
const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
const destinationSidebarPlaceholder = document.getElementById('destination-sidebar-placeholder');

if (destinationSidebarPlaceholder) {
    // Load the new destination sidebar if its placeholder exists
    loadComponent('../../components/destination_sidebar.html', 'destination-sidebar-placeholder');
    console.log("Loading destination sidebar...");
} else if (sidebarPlaceholder) {
    // Load the default sidebar if its placeholder exists and destination one doesn't
    loadComponent('../../components/sidebar.html', 'sidebar-placeholder');
    console.log("Loading default sidebar...");
    // Initialize the default sidebar's dynamic content loading if needed
    if (typeof window.initializeSidebar === 'function') {
         // Delay initialization slightly to ensure component is loaded
         setTimeout(window.initializeSidebar, 100);
    } else {
         console.warn("initializeSidebar function not found after loading default sidebar.");
    }
}
*/
// --- END OF SECTION TO REMOVE/COMMENT ---


// Ensure functions are called after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    loadSidebar(); // Call loadSidebar - This will now handle all sidebar loading correctly
});