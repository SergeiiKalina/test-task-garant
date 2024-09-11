export async function load({ fetch, params }) {
  const { blog_id } = params;
  const res = await fetch(`http://localhost:3000/blogs?blog_id=eq.${blog_id}`);
  if (!res.ok) {
    return {
      status: response.status,
      error: new Error("Failed to load data"),
    };
  }
  const blog = await res.json();

  return { blog };
}
