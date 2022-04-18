const data = {
  users: [{ _id: "1", display_name: "a", username: "a", password: "a" }],
  posts: [
    {
      _id: "1",
      owner_id: "1",
      img_url:
        "https://coca-colafemsa.com/wp-content/uploads/2022/03/CC-botella-237-zero-2018-digital.webp",
      display_name: "ssadas",
      description: "asdasd",
      price: "20000",
    },
    {
      _id: "2",
      owner_id: "1",
      img_url:
        "https://coca-colafemsa.com/wp-content/uploads/2022/03/CC-botella-237-zero-2018-digital.webp",
      display_name: "aAS",
      description: "asaS",
      price: "2000",
    },
  ],
  carts: [],
  histories: [],
  reviews: [
    {
      _id: 1,
      product_id: "1",
      user_id: "1",
      rating: "2",
      description: "sdada",
    },
    {
      _id: 2,
      product_id: "1",
      user_id: "1",
      rating: "3000",
      description: "asdsda",
    },
  ],
};

export default data;
