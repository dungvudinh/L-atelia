import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    Info,
    Share2,
    Download,
    ZoomOut,
    ZoomIn,
    ChevronUp,
    ChevronDown,
    Maximize2,
} from "lucide-react";
import jsPDF from "jspdf";
import { projectsService } from "../../services/projectsService";
import logo from '../../assets/images/logo.png'
// ============================================================
// Sidebar chỉ hiển thị đúng 2 asset cố định: "Brochure" và "Tiến độ xây dựng".
// - Ảnh nền mỗi asset = ảnh đầu tiên của mảng tương ứng (project.brochure[0] / project.constructionProgress[0])
// - Khi mở asset chi tiết, viewer hiển thị TOÀN BỘ ảnh trong mảng đó (project.brochure / project.constructionProgress)
// - URL ảnh dựng qua getThumbnailUrl (ưu tiên thumbnailKey, fallback key)
// ============================================================

const getThumbnailUrl = (image) => {
    if (!image) return '';

    // Ưu tiên thumbnailKey, nếu không có thì dùng key
    const imageKey = image.thumbnailKey || image.key || '';
    if (!imageKey) return '';
    return `https://cdn.latelia.com/latelia/${imageKey}`;
};

// Nếu CDN chưa bật CORS (như lỗi bạn đang gặp), set biến này trỏ tới endpoint proxy
// ảnh phía backend, ví dụ '/posts/proxy-image?url=' (xem gợi ý route ở dưới cuối file).
// Để '' nếu CDN đã cho phép CORS trực tiếp — khi đó tải ảnh thẳng từ cdn.latelia.com.
const IMAGE_PROXY_BASE = '';

// Ảnh có thể đã được browser cache lại từ lần load trước KHÔNG có crossOrigin
// (ví dụ khi hiển thị thumbnail bình thường) — cache đó không có "annotation" CORS,
// nên dù server đã trả đúng access-control-allow-origin, trình duyệt vẫn phục vụ
// lại bản cache cũ và báo lỗi CORS. Thêm 1 query param cố định để buộc trình duyệt
// coi đây là request khác, load lại từ server (vẫn tận dụng được cache của Cloudflare).
const appendCacheBust = (url) => {
    if (!url) return url;
    return url.includes('?') ? `${url}&cors=1` : `${url}?cors=1`;
};

const resolveDownloadUrl = (url) => {
    const bustedUrl = appendCacheBust(url);
    return IMAGE_PROXY_BASE ? `${IMAGE_PROXY_BASE}${encodeURIComponent(bustedUrl)}` : bustedUrl;
};

// Load 1 ảnh thành HTMLImageElement (cần CDN bật CORS — trả header
// Access-Control-Allow-Origin — nếu không sẽ lỗi khi vẽ vào canvas/PDF)
const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
});

// Gộp toàn bộ ảnh của 1 asset thành 1 file PDF duy nhất, mỗi ảnh 1 trang,
// kích thước trang khớp theo tỉ lệ ảnh gốc để không bị méo/viền thừa
const generatePdfFromImages = async (imageUrls, filename = 'document.pdf') => {
    if (!imageUrls || imageUrls.length === 0) return;

    const images = await Promise.all(imageUrls.map(url => loadImage(resolveDownloadUrl(url))));

    const pdf = new jsPDF({
        orientation: images[0].width >= images[0].height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [images[0].width, images[0].height],
    });

    images.forEach((img, index) => {
        if (index > 0) {
            pdf.addPage([img.width, img.height], img.width >= img.height ? 'landscape' : 'portrait');
        }
        pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
    });

    pdf.save(filename);
};

const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.6;
const ZOOM_STEP = 0.2;
const BASE_MAX_WIDTH_REM = 56;

// Vòng tròn hiển thị % nội dung đã cuộn/xem của asset
function ProgressRing({ progress = 0, size = 16, strokeWidth = 2 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

    return (
        <svg width={size} height={size} className="flex-shrink-0 mt-1 -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-txt-secondary transition-[stroke-dashoffset] duration-200"
            />
        </svg>
    );
}

function AssetListItem({ asset, active, progress, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-start gap-2.5 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 text-left border-r-2 transition-colors duration-200 ${
                active ? 'border-txt-secondary bg-txt-secondary/5' : 'border-transparent hover:bg-gray-50'
            }`}
        >
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-black/5 bg-gray-100">
                <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className={`text-xs lg:text-sm truncate ${active ? 'font-semibold text-txt-primary' : 'text-txt-primary'}`}>
                    {asset.title}
                </p>
                <p className="text-[11px] lg:text-xs text-txt-gray mt-0.5 truncate">
                    {asset.images.length} images
                </p>
            </div>
            <ProgressRing progress={progress} />
        </button>
    );
}

// Thumbnail vuông dùng cho dải cuộn ngang trên mobile — thay thế cho sidebar dọc
function MobileAssetThumb({ asset, active, onClick }) {
    return (
        <button type="button" onClick={onClick} className="flex-shrink-0 flex flex-col items-center gap-2">
            <span
                className={`block w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors duration-200 ${
                    active ? 'border-txt-secondary' : 'border-transparent'
                }`}
            >
                <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
            </span>
            <span
                className={`block h-[2px] w-8 rounded-full transition-colors duration-200 ${
                    active ? 'bg-txt-secondary' : 'bg-transparent'
                }`}
            ></span>
        </button>
    );
}

function DocumentViewer() {
    const { projectId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const docIdParam = searchParams.get('doc');

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(1);
    const [assetsExpanded, setAssetsExpanded] = useState(true);
    const [assetProgress, setAssetProgress] = useState({}); // { [assetId]: 0-100 }
    const [isDownloading, setIsDownloading] = useState(false);

    const viewerRef = useRef(null);
    const pageRefs = useRef([]);

    // ===== API call — giữ nguyên logic gọi service như các trang khác =====
    const fetchProjectData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            if (!projectId) throw new Error('Project ID is required');
            const response = await projectsService.getProjectById(projectId);
            setProject(response.data || response);
        } catch (err) {
            console.error('❌ Failed to fetch project data:', err);
            setError(err.message || 'Failed to load project data');
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId) fetchProjectData();
    }, [projectId, fetchProjectData]);

    // Chỉ 2 asset cố định: Brochure & Tiến độ xây dựng
    const assets = useMemo(() => {
        if (!project) return [];

        const brochureList = Array.isArray(project.brochure) ? project.brochure : [];
        const progressList = Array.isArray(project.constructionProgress) ? project.constructionProgress : [];

        const brochureAsset = {
            id: 'brochure',
            title: 'Brochure',
            thumbnailUrl: getThumbnailUrl(brochureList[0]),
            images: brochureList.map(brochure=>`https://cdn.latelia.com/latelia/${brochure.key}`).filter(Boolean),
        };
        const progressAsset = {
            id: 'construction-progress',
            title: 'Tiến độ xây dựng',
            thumbnailUrl: getThumbnailUrl(progressList[0]),
            images: progressList.map(progress => `https://cdn.latelia.com/latelia/${progress.key}`).filter(Boolean),
        };

        return [brochureAsset, progressAsset].filter(asset => asset.images.length > 0);
    }, [project]);

    // Chọn asset theo query param ?doc=<id> nếu có, mặc định item đầu tiên
    useEffect(() => {
        if (assets.length === 0) return;
        const idx = docIdParam ? assets.findIndex(a => String(a.id) === String(docIdParam)) : 0;
        setActiveIndex(idx >= 0 ? idx : 0);
        setCurrentPage(1);
    }, [assets, docIdParam]);

    const activeAsset = assets[activeIndex];
    const pages = useMemo(() => activeAsset?.images || [], [activeAsset]);

    pageRefs.current = [];

    // Theo dõi trang đang xem khi người dùng cuộn
    useEffect(() => {
        if (!viewerRef.current || pages.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pageNum = Number(entry.target.dataset.page);
                        if (pageNum) setCurrentPage(pageNum);
                    }
                });
            },
            { root: viewerRef.current, threshold: 0.5 }
        );

        pageRefs.current.forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, [pages.length, activeIndex]);

    const handleSelectAsset = useCallback((index) => {
        setActiveIndex(index);
        setCurrentPage(1);
        const asset = assets[index];
        if (asset) setSearchParams({ doc: asset.id });
        viewerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }, [assets, setSearchParams]);

    const scrollToPage = useCallback((pageNum) => {
        const el = pageRefs.current[pageNum - 1];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const handlePrevPage = () => currentPage > 1 && scrollToPage(currentPage - 1);
    const handleNextPage = () => currentPage < pages.length && scrollToPage(currentPage + 1);

    // Cập nhật % nội dung đã cuộn cho asset đang mở — dùng để vẽ ProgressRing trong sidebar
    const handleViewerScroll = useCallback(() => {
        const el = viewerRef.current;
        if (!el || !activeAsset) return;
        const scrollable = el.scrollHeight - el.clientHeight;
        const pct = scrollable > 0 ? Math.min(100, Math.max(0, (el.scrollTop / scrollable) * 100)) : 0;
        setAssetProgress(prev => ({ ...prev, [activeAsset.id]: pct }));
    }, [activeAsset]);

    // Gộp toàn bộ ảnh của asset đang xem thành 1 file PDF rồi tải về
    const handleDownload = useCallback(async () => {
        if (!activeAsset || activeAsset.images.length === 0 || isDownloading) return;
        try {
            setIsDownloading(true);
            await generatePdfFromImages(activeAsset.images, `${activeAsset.title}.pdf`);
        } catch (err) {
            console.error('❌ Failed to generate PDF:', err);
        } finally {
            setIsDownloading(false);
        }
    }, [activeAsset, isDownloading]);

    const handleZoomIn = () => setZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
    const handleZoomOut = () => setZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));

    const handleFullscreen = () => {
        if (!viewerRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            viewerRef.current.requestFullscreen?.();
        }
    };

    const handlePageInputChange = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1 && val <= pages.length) {
            scrollToPage(val);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="h-screen flex justify-center items-center px-4">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
                    <p>{error || 'Project not found'}</p>
                    <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-txt-secondary text-white rounded">
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-white" style={{ fontFamily: 'Nunito Sans' }}>
            {/* ===== HEADER (mobile: gọn, chỉ back + logo) ===== */}
            <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 flex-shrink-0">
                <button onClick={() => navigate(-1)} className="text-txt-primary hover:opacity-70 transition-opacity flex-shrink-0 md:hidden">
                    <ArrowLeft size={20} />
                </button>
                <img src={logo} style={{width:'50px'}} className="select-none md:hidden"/>

                {/* <span className="font-subtitle text-lg text-txt-secondary select-none md:hidden" style={{fontFamily:'PangaiaUltralight'}}>L'atelia</span> */}

                {/* ===== HEADER (tablet/desktop: đầy đủ info + share/download) ===== */}
                <div className="hidden md:flex items-center gap-3 lg:gap-4 min-w-0">
                    <button onClick={() => navigate(-1)} className="text-txt-primary hover:opacity-70 transition-opacity flex-shrink-0">
                        <ArrowLeft size={20} />
                    </button>
                    {/* Thay bằng <Logo /> asset thật nếu site đã có sẵn */}
                    <img src={logo} style={{width:'50px'}} className="select-none"/>
                    <span className="h-6 w-px bg-gray-200 flex-shrink-0"></span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-txt-primary truncate">{activeAsset?.title}</p>
                            <Info size={14} className="text-txt-gray flex-shrink-0" />
                        </div>
                        <p className="text-xs text-txt-gray">
                            {pages.length ? `${pages.length} images` : ''}
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading || !activeAsset || activeAsset.images.length === 0}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Download as PDF"
                    >
                        {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Download size={16} className="text-txt-primary" />
                        )}
                    </button>
                </div>
            </header>

            {/* ===== MOBILE-ONLY: badge + dải thumbnail cuộn ngang thay cho sidebar dọc ===== */}
            <div className="md:hidden flex-shrink-0 border-b border-gray-200">
                <div className="px-4 pt-4">
                    <span className="inline-block bg-txt-secondary text-white text-sm font-medium px-4 py-1.5 rounded-full">
                        Brochure & Tiến độ xây dựng
                    </span>
                </div>
                <div className="flex gap-3 overflow-x-auto px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {assets.map((asset, index) => (
                        <MobileAssetThumb
                            key={asset.id}
                            asset={asset}
                            active={index === activeIndex}
                            onClick={() => handleSelectAsset(index)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-txt-primary truncate">{activeAsset?.title}</p>
                            <Info size={14} className="text-txt-gray flex-shrink-0" />
                        </div>
                        <p className="text-xs text-txt-gray">
                            {pages.length ? `${pages.length} images` : ''}
                        </p>
                    </div>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading || !activeAsset || activeAsset.images.length === 0}
                        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        aria-label="Download as PDF"
                    >
                        {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-txt-secondary border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Download size={16} className="text-txt-primary" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 min-h-0 relative">
                {/* ===== SIDEBAR (ẩn trên mobile — thay bằng dải thumbnail ngang phía trên) ===== */}
                <aside className="hidden md:flex md:w-56 lg:w-64 border-r border-gray-200 flex-shrink-0 flex-col min-h-0">
                    <div className="px-4 py-4 flex items-center justify-between flex-shrink-0">
                        <div>
                            <p className="text-sm font-semibold text-txt-secondary">Brochure & Tiến độ xây dựng</p>
                            <p className="text-xs text-txt-gray mt-0.5">{assets.length} Assets</p>
                        </div>
                        <button
                            onClick={() => setAssetsExpanded(prev => !prev)}
                            className="text-txt-gray hover:text-txt-primary transition-colors"
                            aria-label={assetsExpanded ? 'Collapse asset list' : 'Expand asset list'}
                            aria-expanded={assetsExpanded}
                        >
                            <ChevronUp
                                size={16}
                                className={`transition-transform duration-300 ${assetsExpanded ? '' : 'rotate-180'}`}
                            />
                        </button>
                    </div>

                    {/* Vùng cuộn CHỈ áp dụng cho danh sách asset, không phải toàn bộ sidebar.
                        Scrollbar được ẩn (vẫn cuộn được bằng chuột/trackpad) qua các thuộc tính bên dưới. */}
                    <div
                        className="grid transition-[grid-template-rows] duration-300 ease-in-out flex-1 min-h-0"
                        style={{ gridTemplateRows: assetsExpanded ? '1fr' : '0fr' }}
                    >
                        <div className="overflow-y-auto min-h-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            {assets.map((asset, index) => (
                                <AssetListItem
                                    key={asset.id}
                                    asset={asset}
                                    active={index === activeIndex}
                                    progress={assetProgress[asset.id] || 0}
                                    onClick={() => handleSelectAsset(index)}
                                />
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ===== MAIN VIEWER ===== */}
                <main className="flex-1 relative bg-gray-100 overflow-hidden">
                    <div ref={viewerRef} onScroll={handleViewerScroll} className="h-full overflow-y-auto py-4 px-0 sm:px-4 lg:py-8 lg:px-10">
                        <div className="mx-auto flex flex-col gap-3 lg:gap-6" style={{ maxWidth: `${BASE_MAX_WIDTH_REM * zoom}rem` }}>
                            {pages.length === 0 && (
                                <div className="text-center text-txt-gray py-20">No preview available.</div>
                            )}
                            {pages.map((pageUrl, index) => (
                                <div
                                    key={index}
                                    data-page={index + 1}
                                    ref={el => (pageRefs.current[index] = el)}
                                    className="w-full shadow-md rounded-sm overflow-hidden bg-white"
                                >
                                    <img
                                        src={pageUrl}
                                        alt={`Page ${index + 1}`}
                                        className="w-full h-auto block"
                                        loading={index < 2 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thanh điều hướng trang nổi — mobile chỉ giữ điều hướng trang cốt lõi,
                        zoom/fullscreen hiện từ sm trở lên để tránh quá chật trên màn hình nhỏ */}
                    {pages.length > 0 && (
                        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-txt-secondary text-white rounded-full shadow-lg flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                            <span className="opacity-80 hidden sm:inline">Page</span>
                            <input
                                type="number"
                                min={1}
                                max={pages.length}
                                value={currentPage}
                                onChange={handlePageInputChange}
                                className="w-8 sm:w-10 bg-transparent text-center border-b border-white/40 focus:outline-none"
                            />
                            <span className="opacity-80">of {pages.length}</span>
                            <span className="h-4 w-px bg-white/30 mx-1 hidden sm:block"></span>
                            <button onClick={handleZoomOut} className="hover:opacity-70 transition-opacity hidden sm:inline-flex" aria-label="Zoom out">
                                <ZoomOut size={16} />
                            </button>
                            <button onClick={handleZoomIn} className="hover:opacity-70 transition-opacity hidden sm:inline-flex" aria-label="Zoom in">
                                <ZoomIn size={16} />
                            </button>
                            <button onClick={handlePrevPage} className="hover:opacity-70 transition-opacity" aria-label="Previous page">
                                <ChevronUp size={16} />
                            </button>
                            <button onClick={handleNextPage} className="hover:opacity-70 transition-opacity" aria-label="Next page">
                                <ChevronDown size={16} />
                            </button>
                            <button onClick={handleFullscreen} className="hover:opacity-70 transition-opacity hidden sm:inline-flex" aria-label="Fullscreen">
                                <Maximize2 size={16} />
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default DocumentViewer;
