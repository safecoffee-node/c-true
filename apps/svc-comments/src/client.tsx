async function init() {
  const { Comments } = await import("./components/comments");
  const { render } = await import("hono/jsx/dom");
  render(<Comments />, document.querySelector<HTMLElement>("#comments")!);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        init();
      }, 2000);

      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector("#comments")!);
