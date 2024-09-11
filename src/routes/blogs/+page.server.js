export async function load({ fetch }) {
  const res = await fetch("http://18.212.195.234:3000/blogs", {
    method: "GET",
  });

  if (!res.ok) {
    return {
      status: res.status,
      error: new Error("Failed to load data"),
    };
  }

  const blogs = await res.json();
  return { blogs };
}
