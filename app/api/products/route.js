import { NextResponse } from "next/server";


const categories = [
  { id: "traditional", name: "Traditional Finds", note: "Carefully sourced pantry favourites", image: "/jathi.webp" },
  { id: "spices", name: "Aromatic Spices", note: "Big aroma. Honest ingredients.", image: "/spices.jpg" },
  { id: "pickles", name: "Homemade Pickles", note: "Tangy, punchy, made with care", image: "/uppilittath.jpg" },
  { id: "powders", name: "Traditional Powders", note: "Everyday essentials, rooted in home", image: "/powders.jpg" },
];

const products = [
  { id: "mango-pickle", name: "Homestyle Mango Pickle", category: "pickles", price: 180, weight: "250 g", tag: "Bestseller", image: "/mango-pickele.jpg", short: "A bold, tangy classic with a slow-building chilli warmth.", description: "A nostalgic mango pickle inspired by the flavours of a Kerala home kitchen. Enjoy a little alongside rice, kanji, curd rice or your favourite everyday meal." },
  { id: "kerala-chilli", name: "Kerala Chilli Powder", category: "powders", price: 120, weight: "200 g", tag: "Kitchen staple", image: "/chilli-powder.jpg", short: "Vivid colour and a confident, warming kick.", description: "A versatile chilli powder for curries, marinades and everyday cooking. Add gradually to bring the right colour and heat to your recipes." },
  { id: "pepper-whole", name: "Whole Black Pepper", category: "spices", price: 160, weight: "100 g", tag: "Small-batch", image: "/black-pepper.jpg", short: "Fragrant peppercorns with a warm, earthy finish.", description: "A pantry essential for rasam, soups, marinades and freshly cracked seasoning. Store airtight to preserve its natural aroma." },
  { id: "turmeric-powder", name: "Golden Turmeric Powder", category: "powders", price: 95, weight: "200 g", tag: "Everyday essential", image: "/termeric.jpg", short: "Earthy, golden warmth for everyday dishes.", description: "A kitchen staple for dals, curries, vegetables and traditional recipes. A little brings a warm colour and earthy depth to your cooking." },
  { id: "mango-salted", name: "Zesty Mango Pickle", category: "pickles", price: 170, weight: "250 g", tag: "Tangy favourite", image: "/mango-uppil.jpg", short: "Bright citrus tang balanced with traditional spices.", description: "A lively pickle for meals that need a citrusy lift. Serve in small portions with rice, flatbreads or simple home-cooked lunches." },
  { id: "cardamom", name: "Green Cardamom", category: "spices", price: 110, weight: "200 g", tag: "Aromatic", image: "/cardamom.jpg", short: "Sweet, citrusy aroma for curries, tea and desserts.", description: "Fragrant green cardamom pods with a warm, sweet and slightly citrusy aroma. Lovely in masala blends, biryani, payasam, tea and traditional sweets. Crush the pods lightly just before use for the best flavour, and store airtight in a cool, dry place." },
  { id: "coconut-chips", name: "Crispy Coconut Chips", category: "traditional", price: 240, weight: "250 g", tag: "Crunchy snack", image: "/chips.webp", short: "Light, crunchy coconut slices with a natural sweetness.", description: "Thin slices of fresh coconut, lightly fried until crisp. Enjoy them as a tea-time snack, or sprinkle over rice, salads and desserts for extra crunch. Store in an airtight container to keep them crisp." },
  { id: "coconut-oil", name: "Coconut Oil", category: "traditional", price: 430, weight: "500 ml", tag: "Cooking favourite", image: "/cocunut-oil.jpg", short: "Pure, aromatic oil for everyday Kerala cooking.", description: "A kitchen essential in every Kerala home. Its natural coconut aroma suits curries, thoran, frying and tempering, and it also works for traditional hair and skin care. Store in a cool, dry place and keep the lid tightly closed." },
  { id: "kudampuli", name: "Kudampuli (Malabar Tamarind)", category: "traditional", price: 230, weight: "150 g", tag: "Best for meen curry", image: "/kudampuli.webp", short: "Tangy dried Malabar tamarind for authentic Kerala fish curry.", description: "Also known as gambooge or pot tamarind, kudampuli gives Kerala fish curry its signature sour tang and deep flavour. Rinse a few pieces, soak them in warm water and add them to the curry. Store in a dry, airtight jar." },
  { id: "kanthari-mulak", name: "Kanthari Mulagu (Bird's Eye Chilli)", category: "traditional", price: 330, weight: "150 g", tag: "Fiery favourite", image: "/kanthari-mulak.webp", short: "Small chillies with a big, sharp heat.", description: "Kanthari is a tiny, fiery chilli grown in Kerala homes. Crush it into chammanthi, pickles and fish curries, or pound it with coconut oil and salt for a quick side. A little goes a long way, so add it slowly." },
];


export const revalidate = 60;

export async function GET() {
  return NextResponse.json({ categories, products });
}