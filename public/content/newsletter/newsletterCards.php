<?php

use Shop\NewsletterArchive;

const VS_NEWSLETTER_PER_PAGE = 20;

function vsNewsletterCard(array $newsletter): string
{
    $e = function ($value) {
        return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
    };
    $url = '/newsletter/' . rawurlencode($newsletter['slug']);
    $thumb = NewsletterArchive::thumbnailUrl($newsletter['thumbnail'] ?? null);
    $highlights = array_slice(NewsletterArchive::decodeHighlights($newsletter['highlights'] ?? null), 0, 3);

    $html = '<a class="nl-card" href="' . $e($url) . '">';
    $html .= '<div class="nl-card-thumb">';
    $html .= $thumb
        ? '<img src="' . $e($thumb) . '" alt="" loading="lazy">'
        : '<i class="fa-solid fa-envelope-open-text" aria-hidden="true"></i>';
    $html .= '</div><div class="nl-card-body">';
    $html .= '<h3 class="nl-card-title">' . $e($newsletter['title']) . '</h3>';
    if (!empty($highlights)) {
        $html .= '<ul class="nl-card-highlights">';
        foreach ($highlights as $highlight) {
            $html .= '<li>' . $e($highlight) . '</li>';
        }
        $html .= '</ul>';
    } elseif (!empty($newsletter['subject'])) {
        $html .= '<p class="nl-card-subject">' . $e($newsletter['subject']) . '</p>';
    }
    $html .= '</div></a>';
    return $html;
}

function vsNewsletterGrid(array $newsletters): string
{
    if (empty($newsletters)) {
        return '<p class="nl-empty">Aucune newsletter ne correspond à votre recherche.</p>';
    }
    return implode('', array_map('vsNewsletterCard', $newsletters));
}

function vsNewsletterPagination(int $page, int $totalPages, string $query): string
{
    if ($totalPages <= 1) {
        return '';
    }
    $link = function ($target) use ($query) {
        $params = [];
        if ($query !== '') $params['q'] = $query;
        if ($target > 1) $params['page'] = $target;
        return '/newsletter/historique' . (empty($params) ? '' : '?' . http_build_query($params));
    };
    $html = '<nav aria-label="Pagination des newsletters"><ul class="pagination justify-content-center">';
    $html .= '<li class="page-item' . ($page <= 1 ? ' disabled' : '') . '"><a class="page-link" data-page="' . max(1, $page - 1) . '" href="' . htmlspecialchars($link(max(1, $page - 1))) . '" aria-label="Page précédente">&laquo;</a></li>';
    for ($i = 1; $i <= $totalPages; $i++) {
        $active = $i === $page;
        $html .= '<li class="page-item' . ($active ? ' active' : '') . '"><a class="page-link" data-page="' . $i . '" href="' . htmlspecialchars($link($i)) . '"' . ($active ? ' aria-current="page"' : '') . '>' . $i . '</a></li>';
    }
    $html .= '<li class="page-item' . ($page >= $totalPages ? ' disabled' : '') . '"><a class="page-link" data-page="' . min($totalPages, $page + 1) . '" href="' . htmlspecialchars($link(min($totalPages, $page + 1))) . '" aria-label="Page suivante">&raquo;</a></li>';
    $html .= '</ul></nav>';
    return $html;
}

function vsNewsletterSearch(string $query, int $page): array
{
    $dao = \DAO\NewslettersDAO::getSharedInstance();
    $query = mb_substr(trim($query), 0, 100);
    $total = $dao->countSearch($query);
    $totalPages = max(1, (int)ceil($total / VS_NEWSLETTER_PER_PAGE));
    $page = min(max(1, $page), $totalPages);
    $newsletters = $dao->search($query, ($page - 1) * VS_NEWSLETTER_PER_PAGE, VS_NEWSLETTER_PER_PAGE);
    return [
        'query' => $query,
        'page' => $page,
        'total' => $total,
        'totalPages' => $totalPages,
        'grid' => vsNewsletterGrid($newsletters ?: []),
        'pagination' => vsNewsletterPagination($page, $totalPages, $query),
    ];
}
