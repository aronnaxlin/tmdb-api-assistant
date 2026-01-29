// TMDB API 助手 - 主应用逻辑
class TMDBAssistant {
  constructor() {
    // 使用本地API端点（Vercel Serverless）
    this.apiBaseUrl =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api" // 本地开发
        : "/api"; // 生产环境
    this.imageBaseUrl = "https://image.tmdb.org/t/p/";
    this.currentLanguage = "zh-CN";
    this.debounceTimer = null;

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // 搜索
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (e) =>
      this.handleSearchInput(e.target.value),
    );
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch(e.target.value);
    });

    // 语言切换
    document
      .getElementById("result-language")
      .addEventListener("change", (e) => {
        this.currentLanguage = e.target.value;
      });

    // 关闭详情
    document
      .getElementById("close-detail-btn")
      .addEventListener("click", () => {
        this.hideDetail();
      });
  }

  handleSearchInput(query) {
    clearTimeout(this.debounceTimer);
    if (query.length < 2) {
      document.getElementById("results-container").style.display = "none";
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.handleSearch(query);
    }, 500);
  }

  async handleSearch(query) {
    if (!query || query.length < 2) return;

    const mediaType = document.getElementById("media-type").value;
    this.showLoading();

    try {
      const results = await this.searchMulti(query, mediaType);
      this.displayResults(results);
    } catch (error) {
      this.showSnackbar("搜索失败: " + error.message);
      console.error("Search error:", error);
    } finally {
      this.hideLoading();
    }
  }

  async searchMulti(query, mediaType) {
    const url = `${this.apiBaseUrl}/search?query=${encodeURIComponent(query)}&type=${mediaType}&language=${this.currentLanguage}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  }

  displayResults(results) {
    const container = document.getElementById("results-list");
    const countElement = document.getElementById("result-count");

    if (results.length === 0) {
      container.innerHTML =
        '<div class="card"><div class="card-content">未找到相关结果</div></div>';
      document.getElementById("results-container").style.display = "block";
      return;
    }

    countElement.textContent = `共 ${results.length} 个结果`;
    container.innerHTML = results
      .map((item) => this.createResultItem(item))
      .join("");
    document.getElementById("results-container").style.display = "block";

    // 绑定点击事件
    container.querySelectorAll(".result-item").forEach((element, index) => {
      element.addEventListener("click", () => this.showDetail(results[index]));
    });
  }

  createResultItem(item) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date || "";
    const year = date ? new Date(date).getFullYear() : "未知";
    const mediaType = item.media_type === "movie" ? "电影" : "电视剧";
    const posterPath = item.poster_path
      ? `${this.imageBaseUrl}w185${item.poster_path}`
      : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="185" height="278"%3E%3Crect fill="%23ddd" width="185" height="278"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E无海报%3C/text%3E%3C/svg%3E';

    return `
            <div class="result-item" data-id="${item.id}" data-type="${item.media_type}">
                <img src="${posterPath}" alt="${title}" class="result-poster" loading="lazy">
                <div class="result-info">
                    <div class="result-title">
                        ${title}
                        <span class="result-badge ${item.media_type === "movie" ? "badge-movie" : "badge-tv"}">${mediaType}</span>
                    </div>
                    <div class="result-meta">
                        <strong>年份:</strong> ${year} | <strong>TMDB ID:</strong> ${item.id}
                    </div>
                    ${item.overview ? `<div class="result-overview">${item.overview}</div>` : ""}
                </div>
            </div>
        `;
  }

  async showDetail(item) {
    this.showLoading();

    try {
      const details = await this.getDetails(item.id, item.media_type);
      this.displayDetail(details, item.media_type);
      this.generateRenameFormat(details, item.media_type);
    } catch (error) {
      this.showSnackbar("获取详情失败: " + error.message);
      console.error("Detail error:", error);
    } finally {
      this.hideLoading();
    }
  }

  async getDetails(id, mediaType) {
    const url = `${this.apiBaseUrl}/details?id=${id}&type=${mediaType}&languages=zh-CN,zh-TW,en-US,ja-JP`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    return await response.json();
  }

  displayDetail(details, mediaType) {
    const title = details.title || details.name;
    const originalTitle = details.original_title || details.original_name;
    const date = details.release_date || details.first_air_date || "";
    const year = date ? new Date(date).getFullYear() : "未知";

    let detailHTML = `
            <div class="detail-grid">
                <div class="detail-label">TMDB ID:</div>
                <div class="detail-value"><strong>${details.id}</strong></div>

                <div class="detail-label">原始标题:</div>
                <div class="detail-value">${originalTitle}</div>

                <div class="detail-label">简体中文:</div>
                <div class="detail-value">${details.translations["zh-CN"].title || originalTitle}</div>

                <div class="detail-label">繁体中文:</div>
                <div class="detail-value">${details.translations["zh-TW"].title || originalTitle}</div>

                <div class="detail-label">英文:</div>
                <div class="detail-value">${details.translations["en-US"].title || originalTitle}</div>

                <div class="detail-label">日文:</div>
                <div class="detail-value">${details.translations["ja-JP"].title || originalTitle}</div>

                <div class="detail-label">年份:</div>
                <div class="detail-value">${year}</div>
        `;

    if (mediaType === "tv" && details.seasons) {
      detailHTML += `
                <div class="detail-label">季数:</div>
                <div class="detail-value">${details.number_of_seasons} 季</div>

                <div class="detail-label">总集数:</div>
                <div class="detail-value">${details.number_of_episodes} 集</div>
            </div>

            <h3 style="margin: 24px 0 16px 0;">分季信息</h3>
            <div class="season-list">
                ${details.seasons
                  .map(
                    (season) => `
                    <div class="season-item">
                        <div>
                            <div class="season-name">${season.name}</div>
                            <div class="season-meta">
                                ${season.episode_count} 集
                                ${season.air_date ? `| 首播: ${season.air_date}` : ""}
                            </div>
                        </div>
                        <div class="detail-value">Season ${String(season.season_number).padStart(2, "0")}</div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            `;
    } else {
      detailHTML += "</div>";
    }

    document.getElementById("detail-content").innerHTML = detailHTML;
    document.getElementById("detail-card").style.display = "block";

    // 滚动到详情卡片
    document
      .getElementById("detail-card")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  generateRenameFormat(details, mediaType) {
    const date = details.release_date || details.first_air_date || "";
    const year = date ? new Date(date).getFullYear() : "";

    const names = {
      "zh-CN": details.translations["zh-CN"].title,
      "zh-TW": details.translations["zh-TW"].title,
      "en-US": details.translations["en-US"].title,
      "ja-JP": details.translations["ja-JP"].title,
    };

    let renameHTML = "";

    if (mediaType === "movie") {
      renameHTML = `
                <div class="rename-section">
                    <h3>电影文件夹命名</h3>
                    ${Object.entries(names)
                      .map(([lang, name]) => {
                        const langName = {
                          "zh-CN": "简中",
                          "zh-TW": "繁中",
                          "en-US": "英文",
                          "ja-JP": "日文",
                        }[lang];
                        return `
                            <div class="rename-example">
                                <span><strong>${langName}:</strong> ${name} (${year})</span>
                                <button class="copy-btn" onclick="copyToClipboard('${this.escapeHtml(name)} (${year})')">
                                    <span class="material-icons" style="font-size: 14px;">content_copy</span>
                                    复制
                                </button>
                            </div>
                        `;
                      })
                      .join("")}

                    <div class="rename-example">
                        <span><strong>带 TMDB ID:</strong> ${names["zh-CN"]} (${year})[tmdbid-${details.id}]</span>
                        <button class="copy-btn" onclick="copyToClipboard('${this.escapeHtml(names["zh-CN"])} (${year})[tmdbid-${details.id}]')">
                            <span class="material-icons" style="font-size: 14px;">content_copy</span>
                            复制
                        </button>
                    </div>
                </div>
            `;
    } else {
      renameHTML = `
                <div class="rename-section">
                    <h3>电视剧文件夹命名</h3>
                    ${Object.entries(names)
                      .map(([lang, name]) => {
                        const langName = {
                          "zh-CN": "简中",
                          "zh-TW": "繁中",
                          "en-US": "英文",
                          "ja-JP": "日文",
                        }[lang];
                        return `
                            <div class="rename-example">
                                <span><strong>${langName}:</strong> ${name} (${year})</span>
                                <button class="copy-btn" onclick="copyToClipboard('${this.escapeHtml(name)} (${year})')">
                                    <span class="material-icons" style="font-size: 14px;">content_copy</span>
                                    复制
                                </button>
                            </div>
                        `;
                      })
                      .join("")}

                    <div class="rename-example">
                        <span><strong>带 TMDB ID:</strong> ${names["zh-CN"]} (${year})[tmdbid-${details.id}]</span>
                        <button class="copy-btn" onclick="copyToClipboard('${this.escapeHtml(names["zh-CN"])} (${year})[tmdbid-${details.id}]')">
                            <span class="material-icons" style="font-size: 14px;">content_copy</span>
                            复制
                        </button>
                    </div>
                </div>

                <div class="rename-section">
                    <h3>季文件夹命名</h3>
                    ${
                      details.seasons
                        ? details.seasons
                            .map(
                              (season) => `
                        <div class="rename-example">
                            <span><strong>${season.name}:</strong> Season ${String(season.season_number).padStart(2, "0")}</span>
                            <button class="copy-btn" onclick="copyToClipboard('Season ${String(season.season_number).padStart(2, "0")}')">
                                <span class="material-icons" style="font-size: 14px;">content_copy</span>
                                复制
                            </button>
                        </div>
                    `,
                            )
                            .join("")
                        : ""
                    }
                </div>

                <div class="rename-section">
                    <h3>剧集文件命名前缀（示例）</h3>
                    ${Object.entries(names)
                      .map(([lang, name]) => {
                        const langName = {
                          "zh-CN": "简中",
                          "zh-TW": "繁中",
                          "en-US": "英文",
                          "ja-JP": "日文",
                        }[lang];
                        return `
                            <div class="rename-example">
                                <span><strong>${langName}:</strong> ${name} S01E</span>
                                <button class="copy-btn" onclick="copyToClipboard('${this.escapeHtml(name)} S01E')">
                                    <span class="material-icons" style="font-size: 14px;">content_copy</span>
                                    复制
                                </button>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            `;
    }

    document.getElementById("rename-content").innerHTML = renameHTML;
    document.getElementById("rename-card").style.display = "block";
  }

  hideDetail() {
    document.getElementById("detail-card").style.display = "none";
    document.getElementById("rename-card").style.display = "none";
  }

  escapeHtml(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, "&quot;");
  }

  showLoading() {
    document.getElementById("loading-overlay").style.display = "flex";
  }

  hideLoading() {
    document.getElementById("loading-overlay").style.display = "none";
  }

  showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.classList.add("show");

    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  }
}

// 全局复制函数
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const snackbar = document.getElementById("snackbar");
      snackbar.textContent = "已复制到剪贴板";
      snackbar.classList.add("show");
      setTimeout(() => snackbar.classList.remove("show"), 2000);
    })
    .catch((err) => {
      console.error("复制失败:", err);
    });
}

// 初始化应用
document.addEventListener("DOMContentLoaded", () => {
  new TMDBAssistant();
});
