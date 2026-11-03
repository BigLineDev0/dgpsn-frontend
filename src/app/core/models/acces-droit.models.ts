// Interfaces pour le composant Accès au Droit

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    categoryLabel: string;
    date: string;
    readTime: string;
    tags: string[];
    icon: string;
    author?: string;
    imageUrl?: string;
    status?: 'published' | 'draft' | 'archived';
    viewCount?: number;
    connections: ArticleConnections;
    relatedResources: RelatedResources;
    seoMeta?: SeoMeta;
}

export interface ArticleConnections {
    juridique: boolean;
    annuaire: boolean;
    demarche: boolean;
}

export interface RelatedResources {
    juridique: RelatedResource[];
    annuaire: RelatedResource[];
    demarche: RelatedResource[];
}

export interface RelatedResource {
    title: string;
    url: string;
    description?: string;
    type?: 'internal' | 'external';
    icon?: string;
}

export interface Category {
    id: string;
    label: string;
    count: number;
    description?: string;
    color?: string;
    icon?: string;
}

export interface SeoMeta {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
}

// Interfaces pour les filtres et la recherche
export interface ArticleFilter {
    category?: string;
    tags?: string[];
    dateRange?: DateRange;
    searchTerm?: string;
    sortBy?: 'date' | 'title' | 'popularity';
    sortOrder?: 'asc' | 'desc';
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

// Interface pour les statistiques
export interface ArticleStats {
    totalArticles: number;
    categoriesCount: number;
    averageReadTime: number;
    mostPopularCategory: string;
}

// Interface pour la navigation
export interface BreadcrumbItem {
    label: string;
    url?: string;
    active?: boolean;
}

// Types pour les événements du composant
export type ArticleEvent = 'view' | 'share' | 'bookmark' | 'print';

export interface ArticleEventData {
    articleId: string;
    event: ArticleEvent;
    timestamp: Date;
    metadata?: Record<string, any>;
}

// Interface pour la configuration du composant
export interface AccesDroitConfig {
    itemsPerPage: number;
    enableInfiniteScroll: boolean;
    showReadTime: boolean;
    showAuthor: boolean;
    showTags: boolean;
    enableSearch: boolean;
    enableFilters: boolean;
    defaultCategory: string;
    animationDuration: number;
}

// Interface pour les services
export interface ArticleService {
    getArticles(filter?: ArticleFilter): Promise<Article[]>;
    getArticleById(id: string): Promise<Article | null>;
    getCategories(): Promise<Category[]>;
    getArticleStats(): Promise<ArticleStats>;
    searchArticles(query: string): Promise<Article[]>;
    trackArticleEvent(event: ArticleEventData): Promise<void>;
}

// Types utilitaires
export type ArticleStatus = 'published' | 'draft' | 'archived';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list' | 'compact';

// Interface pour l'état du composant (si vous utilisez NgRx ou similar)
export interface AccesDroitState {
    articles: Article[];
    filteredArticles: Article[];
    categories: Category[];
    selectedCategory: string;
    selectedArticle: Article | null;
    showDetailView: boolean;
    isLoading: boolean;
    error: string | null;
    filter: ArticleFilter;
    stats: ArticleStats | null;
}