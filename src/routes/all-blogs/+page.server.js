export async function load({ fetch }) {

    const tokenRewrite =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmV3cml0ZXIiLCJ1c2VyX2lkIjo0fQ.ExcwIS5H6mGoGQOv6zX_4eND5hBzZ0k_R7Czyl5mBmY';
    const res = await fetch("http://18.212.195.234:3000/get_all_blogs", {
        
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenRewrite}`
    },
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
  