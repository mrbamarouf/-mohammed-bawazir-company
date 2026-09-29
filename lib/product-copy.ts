import type { Product } from "./types";

// Source records remain immutable. This presentation layer corrects spelling and
// typography without merging products or inferring missing specifications.
const corrections: Record<string, string> = {
  "تروبيكنا سلم": "تروبيكانا سليم", "تروبيكنا": "تروبيكانا", "تروبيكانا سلم": "تروبيكانا سليم",
  "تروبيكانا قهوة لاتيه نحيفة": "تروبيكانا سليم — قهوة لاتيه",
  "تروبيكانا شراب حلو عربي سليم": "تروبيكانا سليم — شراب حلو عربي",
  "محلي خالي": "مُحلٍّ خالٍ من", "محلي خالي من": "مُحلٍّ خالٍ من",
  "محلي منخفض": "مُحلٍّ منخفض", "محلي المونك فروت": "مُحلّي المونك فروت",
  "ستيفيا مع الكروميوم": "ستيفيا مع الكروميوم", "اقراص": "أقراص", "اكياس": "أكياس",
  "ادونيس": "أدونيس", "زيتكون": "زيتون", "مامع": "ملمع", "ابيض": "أبيض",
  "فصوليا": "فاصوليا", "تفاحيتن": "تفاحتين", "مقتته": "مفتتة",
  "فيتايين": "فيتاين", "مربي الفراولة": "مربى الفراولة", "الفواكة": "الفواكه",
  "بهارات الكفنة": "بهارات الكفتة", "باستادور –": "باستادورو —",
  "مزيج متبقي زيت الزيتون": "مزيج زيت ثفل الزيتون", "كوبيكو حلوة القهوة": "كوبيكو — حلوى القهوة",
  "إيلمور": "إلمور", "إيلفي": "إلفي", "النخله": "النخلة", "الاناناس": "الأناناس",
  "بارأصابع": "أصابع", "بار أصابع": "أصابع", "حلاو طحينية": "حلاوة طحينية", "حلاة": "حلاوة",
  "ادونيس جميع البهارات": "أدونيس — بهارات", "adonis all spices": "Adonis spices",
  "ريم زيت زيتون ثفل": "ريم زيت ثفل الزيتون", "لانشون ريم لحم": "ريم لانشون لحم",
  "arabic sweet syrup stevia sugar free": "sugar-free Arabic sweet syrup with stevia",
  "حلاوة طحينية أصابع": "أصابع حلاوة طحينية", "حلاوة أصابع": "أصابع حلاوة",
  "فول مدمس حبه صيني": "فول مدمس حب صيني", "طماطم كاتشب": "كاتشب الطماطم",
  "حليب مجفف بودرة": "حليب مجفف", "ورق عنب محشي": "ورق عنب محشو", "ريم بقري لانشون": "ريم لانشون بقري",
  "بلوبرّي": "بلوبيري", "all insect killer": "insect killer",
  "sardine vegitable oil with chilly": "sardines in vegetable oil with chilli",
  "sardine with vegitable oil": "sardines in vegetable oil",
  "light meat tuna in soybean oil flakes": "light meat tuna flakes in soybean oil",
  "light meat tuna in sun flower oil chunks": "light meat tuna chunks in sunflower oil",
  "sugar free drink chocolate": "sugar-free chocolate drink", "sugar free drink caffe latte": "sugar-free caffè latte drink",
  "sugar free drink vanilla cappuccino": "sugar-free vanilla cappuccino drink",
  "french cheese": "French cheese", "korean": "Korean", "chinese": "Chinese", "arabic sweet syrup": "Arabic sweet syrup",
  "corny balls hot cheese": "Corny hot cheese balls", "corny balls cheese": "Corny cheese balls",
  "sandwich biscuit vanilla": "vanilla sandwich biscuit", "( bag )": "(bag)",
  "3 strawberry cake roll": "3 strawberry cake rolls", "3 chocolate cake roll": "3 chocolate cake rolls", "3 vanilla cake roll": "3 vanilla cake rolls",
  "1 cup chocolate cake": "1 chocolate cupcake", "1 cup vanilla cake": "1 vanilla cupcake",
  "2 cup chocolate cake": "2 chocolate cupcakes", "2 cup vanilla cake": "2 vanilla cupcakes",
  "with strawberry with": "with strawberry", "vegitable": "vegetable", "chilly": "chilli",
  "sun flower": "sunflower", "blue berry": "blueberry", "sufle": "soufflé",
  "croissant chocolate with vanilla": "croissant with chocolate and vanilla",
  "better biscuits chocolate": "Better chocolate biscuits", "better biscuits vanilla": "Better vanilla biscuits",
  "family cake marble": "marble family cake ", "cake grand with chocolate": "Grand chocolate cake",
  "cake kunafa with pistachio": "pistachio kunafa cake", "cake lafa sufle berries": "Lafa berry soufflé cake",
  "cake sufle pistachio": "pistachio soufflé cake", "cake sufle chocolate": "chocolate soufflé cake",
  "ketchup&cheese": "ketchup & cheese", "stain removal all colors": "stain remover for all colours",
  "8000 disposal": "8000 disposable", "flavor": "flavour", "colors": "colours",
};
const properNames = ["Tropicana Slim", "Mie Sedaap", "NutriSari", "Catch Me", "Reem", "Fantastic", "Corny", "Chpsy", "ZigZag", "Duitto", "Falcon", "Indo Coal", "Fuyl", "Jelli Nim", "Pif Paf", "Air Wick", "Dettol", "Vanish", "Al Fakher", "Mellinim", "Choki Choki", "ChocoCashew", "Slai O’Lai", "Better", "Al Basha", "Nakhla", "Golden Coal", "Tropicana", "Kopiko", "Tora Bika", "Danisa", "Coffee Joy", "Adonis", "Bull Dose", "Lafa", "Grand", "Parm", "Mie Goreng", "Coffee Shot", "Blanca", "Zaghloul", "Mexicana"];
// These imported records disagree on pack size or contain an unverified unit.
// Withhold the disputed pack attribute; do not guess a corrected quantity.
const withheldPackIds = new Set([34405,6498,34448,6488,34443,6478,34388,35777,35775,35727,35723,35721,35715]);
export function editProductText(text: string, language: Product["language"]) {
  let value = text.trim().replace(/\s+/g, " ");
  if(language === "en") value = value.toLowerCase();
  // Longest replacements first, so a phrase is never partially rewritten.
  for(const [from,to] of Object.entries(corrections).sort((a,b)=>b[0].length-a[0].length)) value=value.split(from).join(to);
  value=value.replace(/من من/g,"من").replace(/\s*_\s*/g," — ").replace(/\s*–\s*/g," — ").replace(/(?<=\S)\s+-\s*|(?<=\S)-\s+/g," — ");
  value=value.replace(/(\d)\s*[x*]\s*(?=\d)/gi,"$1 × ").replace(/(?<=\d)\s*(?:grams?|gm|g)\b/gi," g").replace(/(?<=\d)\s*kg\b/gi," kg").replace(/(?<=\d)\s*ml\b/gi," ml").replace(/(?<=\d)\s*l\b/gi," L");
  value=value.replace(/(\d)\s*(?:جرام|جم)/g,"$1 جم").replace(/(\d)\s*مل/g,"$1 مل");
  if(language === "en") {
    for(const name of properNames) value=value.replace(new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi"),name);
    value=value.charAt(0).toUpperCase()+value.slice(1);
  }
  return value.replace(/\s+/g," ").trim();
}
export function productPresentation(product: Product) {
  let displayName = editProductText(product.name, product.language);
  if(withheldPackIds.has(product.id)) displayName=displayName.replace(/\s*\(?\d+(?:\.\d+)?\s*(?:g|mg|kg|ml|L|جم|جرام|مل)\)?/gi,"").trim();
  // The source's translated packaging word is unclear; retain the product type.
  if([9852,9849,9847].includes(product.id)) displayName=displayName.replace(/\s+شفرات/g,"");
  if(product.id===35789) displayName=displayName.replace(/\s*\+\s*1\.8$/,"");
  const hasPackDetail=[36496,36495,36494,36489,5173,6525].includes(product.id);
  const displayDescription=hasPackDetail ? editProductText(product.description,product.language) : "";
  return {displayName,displayDescription};
}
