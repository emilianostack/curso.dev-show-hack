(function () {
  const originalFetch = window.fetch;

  window.fetch = function (input, init = {}) {
    const url = typeof input === "string" ? input : input.url;
    const method = (init?.method || "GET").toUpperCase();

    const isNextQuestion =
      method === "POST" && url.includes("/api/v1/show/questions/next/");

    if (!isNextQuestion) {
      return originalFetch.apply(this, arguments);
    }

    return originalFetch.apply(this, arguments).then((response) => {
      try {
        const clone = response.clone();
        clone.json().then((data) => {
          window.dispatchEvent(
            new CustomEvent("cursoDevQuestion", { detail: data })
          );
        });
      } catch (err) {
        console.warn("Erro ao ler JSON:", err);
      }

      return response;
    });
  };
})();
