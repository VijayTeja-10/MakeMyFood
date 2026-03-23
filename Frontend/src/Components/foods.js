const FoodPlaces = [
  {
    "name": "Royal Dum Biryani",
    "image": "https://tse1.mm.bing.net/th/id/OIP.FBrBppmwM9GFay_wOfmHoAHaFj?pid=Api&h=220&P=0",
    "desc": "Famous for its slow-cooked dum biryani and Mughlai delicacies.",
    "phone": "+91-9001122334",
    "isRes": true,
    "tables": 20,
    "seats": 4,
    "items": [
      {
        "name": "Chicken Dum Biryani",
        "img": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80",
        "desc": "Classic slow-cooked chicken biryani with aromatic spices and tender meat.",
        "price": 350,
        "instock": true
      },
      {
        "name": "Mutton Seekh Kebab",
        "img": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        "desc": "Juicy minced mutton skewers grilled to perfection in a tandoor.",
        "price": 420,
        "instock": true
      }
    ]
  },
  {
    "name": "Organic Harvest Market",
    "image": "https://tse3.mm.bing.net/th/id/OIP.Gc215TAwe5xXHFXzMcKsAwHaDa?pid=Api&h=220&P=0",
    "desc": "Organic food market with fresh fruits, vegetables, and eco-friendly products.",
    "phone": "+91-9055667788",
    "isRes": false,
    "tables": 0,
    "seats": 0,
    "items": [
      {
        "name": "Farm Fresh Apples",
        "img": "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=800&q=80",
        "desc": "Crisp, sweet, and locally sourced organic apples (per kg).",
        "price": 180,
        "instock": true
      },
      {
        "name": "Raw Wild Honey",
        "img": "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?w=800&q=80",
        "desc": "Unprocessed, pure wild honey in a sustainable glass jar.",
        "price": 450,
        "instock": false
      }
    ]
  },
  {
    "name": "Spice Garden",
    "image": "https://tse2.mm.bing.net/th/id/OIP.CiBduIS3nOjMR_SPa2kOtAHaFP?pid=Api&h=220&P=0",
    "desc": "Authentic Indian cuisine with a modern twist, specializing in biryanis and tandoori dishes.",
    "phone": "+91-9876543210",
    "isRes": true,
    "tables": 15,
    "seats": 4,
    "items": [
      {
        "name": "Tandoori Chicken Half",
        "img": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&q=80",
        "desc": "Half a chicken marinated in yogurt and spices, roasted in a clay oven.",
        "price": 380,
        "instock": true
      },
      {
        "name": "Garlic Butter Naan",
        "img": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=800&q=80",
        "desc": "Soft, fluffy Indian flatbread topped with minced garlic and butter.",
        "price": 60,
        "instock": true
      }
    ]
  },
  {
    "name": "Sweet Crust Bakery",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    "desc": "Bakery shop with artisan breads, cakes, and pastries baked fresh daily.",
    "phone": "+91-9022334455",
    "isRes": true,
    "tables": 8,
    "seats": 2,
    "items": [
      {
        "name": "Dark Chocolate Truffle Cake",
        "img": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        "desc": "Rich, decadent chocolate layered cake with a glossy ganache finish.",
        "price": 850,
        "instock": true
      },
      {
        "name": "Butter Croissant",
        "img": "https://images.unsplash.com/photo-1555507036-ab1d4075c6f1?w=800&q=80",
        "desc": "Flaky, golden, traditional French butter croissant.",
        "price": 120,
        "instock": true
      }
    ]
  },
  {
    "name": "Dairy Delight",
    "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80",
    "desc": "Store dedicated to dairy products including milk, yogurt, butter, and cheese.",
    "phone": "+91-9044556677",
    "isRes": false,
    "tables": 0,
    "seats": 0,
    "items": [
      {
        "name": "Whole Organic Milk",
        "img": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80",
        "desc": "Fresh, pasteurized whole milk in a 1-liter glass bottle.",
        "price": 80,
        "instock": true
      },
      {
        "name": "Aged Cheddar Block",
        "img": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80",
        "desc": "Sharp and crumbly aged cheddar cheese block (250g).",
        "price": 320,
        "instock": false
      }
    ]
  },
  {
    "name": "Green Bowl",
    "image": "https://tse4.mm.bing.net/th/id/OIP.oL6e0ecTAUEdtCz_2WQ98AHaKj?pid=Api&h=220&P=0",
    "desc": "Healthy vegetarian and vegan options with organic ingredients and smoothie bowls.",
    "phone": "+91-9988776655",
    "isRes": true,
    "tables": 12,
    "seats": 2,
    "items": [
      {
        "name": "Superfood Salad Bowl",
        "img": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
        "desc": "A mix of quinoa, avocado, mixed greens, and a light lemon vinaigrette.",
        "price": 290,
        "instock": true
      },
      {
        "name": "Berry Blast Smoothie",
        "img": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80",
        "desc": "Thick smoothie blended with mixed berries, chia seeds, and almond milk.",
        "price": 210,
        "instock": true
      }
    ]
  },
  {
    "name": "Prime Cuts Butcher",
    "image": "https://tse1.mm.bing.net/th/id/OIP.3vYogR_xW9xJ1JcKijkHMQHaGN?pid=Api&h=220&P=0",
    "desc": "Butcher shop specializing in fresh meats, sausages, and premium cuts.",
    "phone": "+91-9033445566",
    "isRes": false,
    "tables": 0,
    "seats": 0,
    "items": [
      {
        "name": "Premium Ribeye Steak",
        "img": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
        "desc": "Thick-cut, well-marbled ribeye steak perfect for grilling.",
        "price": 1200,
        "instock": true
      },
      {
        "name": "Boneless Chicken Breast",
        "img": "https://images.unsplash.com/photo-1604543503525-45214be318f7?w=800&q=80",
        "desc": "Cleaned and trimmed fresh chicken breast (per kg).",
        "price": 280,
        "instock": true
      }
    ]
  },
  {
    "name": "Ocean Breeze Café",
    "image": "https://tse1.mm.bing.net/th/id/OIP.BMGrTHB_jFHB9pRl5NiX1gHaHa?pid=Api&h=220&P=0",
    "desc": "A cozy seaside café offering continental breakfast, fresh seafood, and artisanal coffee.",
    "phone": "+91-9123456780",
    "isRes": true,
    "tables": 10,
    "seats": 4,
    "items": [
      {
        "name": "Artisanal Cappuccino",
        "img": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
        "desc": "Freshly brewed espresso topped with perfectly steamed milk foam.",
        "price": 180,
        "instock": true
      },
      {
        "name": "Classic Fish and Chips",
        "img": "https://images.unsplash.com/photo-1580221805566-50e5eb1e4eb1?w=800&q=80",
        "desc": "Crispy battered white fish served with rustic fries and tartar sauce.",
        "price": 450,
        "instock": true
      }
    ]
  },
  {
    "name": "FreshMart Grocery",
    "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    "desc": "Modern grocery store offering fresh produce, packaged goods, and household essentials.",
    "phone": "+91-9011223344",
    "isRes": false,
    "tables": 0,
    "seats": 0,
    "items": [
      {
        "name": "Farm Fresh Eggs (Dozen)",
        "img": "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80",
        "desc": "A carton of 12 free-range brown eggs.",
        "price": 110,
        "instock": true
      },
      {
        "name": "Whole Wheat Bread",
        "img": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
        "desc": "Freshly baked, healthy whole wheat sandwich bread loaf.",
        "price": 55,
        "instock": true
      }
    ]
  }
];

export default FoodPlaces;