const products = [
  {
    id: "tomatoes",
    name: "Tomatoes",
    category: "Vegetables",
    price: 8000,
    unit: "kg",
    stock: 42,
    image: "okene2.png",
    description: "Fresh sun-ripened tomatoes sourced directly from our farm in Okene. Rich in nutrients, perfect for soups, stews and sauces.",
    sizes: [1, 3, 5, 10, 25]
  },
  {
    id: "fresh-milk",
    name: "Fresh Milk",
    category: "Dairy",
    price: 5000,
    unit: "litre",
    stock: 20,
    image: "okene6.png",
    description: "Pure fresh milk from healthy grass-fed cows. No preservatives, delivered daily straight from the farm.",
    sizes: [1, 2, 5, 10]
  },
  {
    id: "sweet-corn",
    name: "Sweet Corn",
    category: "Grains",
    price: 3000,
    unit: "cob",
    stock: 80,
    image: "okene7.png",
    description: "Freshly harvested sweet corn, tender and full of natural sweetness. Great for boiling, roasting and grilling.",
    sizes: [2, 5, 10, 20]
  },
  {
    id: "cowpea",
    name: "Cowpea",
    category: "Legumes",
    price: 2000,
    unit: "kg",
    stock: 60,
    image: "okene2.png",
    description: "High protein cowpeas, sun-dried and carefully sorted for quality. Perfect for soups and porridge.",
    sizes: [1, 2, 5, 10]
  },
  {
    id: "spinach",
    name: "Spinach",
    category: "Vegetables",
    price: 1500,
    unit: "bunch",
    stock: 35,
    image: "okene2.png",
    description: "Fresh green spinach packed with iron and vitamins. Harvested daily and delivered fresh to your door.",
    sizes: [1, 2, 5]
  },
  {
    id: "honey",
    name: "Honey",
    category: "Natural",
    price: 6000,
    unit: "jar",
    stock: 15,
    image: "okene2.png",
    description: "Pure organic honey harvested from our beehives in Okene. No additives, no sugar — just natural goodness.",
    sizes: [1, 2, 3]
  },
  {
    id: "carrots",
    name: "Carrots",
    category: "Vegetables",
    price: 1200,
    unit: "kg",
    stock: 50,
    image: "okene2.png",
    description: "Crunchy fresh carrots grown in rich farm soil. Great for cooking, juicing and eating raw.",
    sizes: [1, 2, 5, 10]
  },
  {
    id: "farm-eggs",
    name: "Farm Eggs",
    category: "Dairy",
    price: 3500,
    unit: "crate",
    stock: 25,
    image: "okene2.png",
    description: "Free range farm eggs from healthy hens. Each crate contains 30 eggs. Fresh and full of protein.",
    sizes: [1, 2, 3, 5]
  },
  {
    id: "yam",
    name: "Yam",
    category: "Tubers",
    price: 4000,
    unit: "tuber",
    stock: 30,
    image: "okene2.png",
    description: "Large fresh yam tubers from our farm. Perfect for pounding, frying, boiling and making yam porridge.",
    sizes: [1, 2, 5]
  },
  {
    id: "red-pepper",
    name: "Red Pepper",
    category: "Vegetables",
    price: 2500,
    unit: "kg",
    stock: 0,
    image: "okene2.png",
    description: "Hot fresh red peppers, available sun-dried or fresh. Adds bold flavour to any Nigerian dish.",
    sizes: [1, 2, 5]
  },
  {
    id: "cassava",
    name: "Cassava",
    category: "Tubers",
    price: 1800,
    unit: "kg",
    stock: 45,
    image: "okene2.png",
    description: "Fresh cassava roots from the farm. Great for making garri, fufu, tapioca and cassava flour.",
    sizes: [1, 5, 10, 25]
  },
  {
    id: "groundnut",
    name: "Groundnut",
    category: "Legumes",
    price: 2200,
    unit: "kg",
    stock: 38,
    image: "okene2.png",
    description: "Freshly harvested groundnuts, carefully dried and sorted. Perfect for groundnut soup, oil and snacking.",
    sizes: [1, 2, 5, 10]
  },
  {
    id: "plantain",
    name: "Plantain",
    category: "Fruits",
    price: 1000,
    unit: "bunch",
    stock: 22,
    image: "okene2.png",
    description: "Ripe and unripe plantain bunches freshly cut from the farm. Great for frying, boiling and baking.",
    sizes: [1, 2, 3]
  },
  {
    id: "garlic",
    name: "Garlic",
    category: "Vegetables",
    price: 900,
    unit: "bulb",
    stock: 0,
    image: "okene2.png",
    description: "Fresh aromatic garlic bulbs grown on our farm. Strong flavour, perfect for cooking and natural remedies.",
    sizes: [5, 10, 20, 50]
  },
  {
    id: "palm-oil",
    name: "Palm Oil",
    category: "Natural",
    price: 7000,
    unit: "litre",
    stock: 18,
    image: "okene2.png",
    description: "Pure red palm oil freshly processed from our palm trees. Rich colour, natural flavour, no additives.",
    sizes: [1, 2, 5, 10]
  }
];