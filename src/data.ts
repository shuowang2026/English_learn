import { LearningItem, SpeakingScene } from './types';

interface AlphabetItem {
  id: string;
  uppercase: string;
  lowercase: string;
  phonetic: string;
  strokes: Array<{ x: number; y: number }[]>;
}

export const alphabet: AlphabetItem[] = [
  { id: 'A', uppercase: 'A', lowercase: 'a', phonetic: '/eɪ/', strokes: [
    [{ x: 60, y: 200 }, { x: 140, y: 40 }],
    [{ x: 140, y: 40 }, { x: 220, y: 200 }],
    [{ x: 90, y: 120 }, { x: 190, y: 120 }]
  ]},
  { id: 'B', uppercase: 'B', lowercase: 'b', phonetic: '/biː/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 180, y: 45 }, { x: 200, y: 100 }, { x: 60, y: 120 }],
    [{ x: 60, y: 120 }, { x: 200, y: 125 }, { x: 210, y: 180 }, { x: 60, y: 200 }]
  ]},
  { id: 'C', uppercase: 'C', lowercase: 'c', phonetic: '/siː/', strokes: [
    [{ x: 200, y: 50 }, { x: 100, y: 90 }, { x: 100, y: 150 }, { x: 200, y: 190 }]
  ]},
  { id: 'D', uppercase: 'D', lowercase: 'd', phonetic: '/diː/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 190, y: 60 }, { x: 220, y: 120 }, { x: 190, y: 180 }, { x: 60, y: 200 }]
  ]},
  { id: 'E', uppercase: 'E', lowercase: 'e', phonetic: '/iː/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 200, y: 40 }],
    [{ x: 60, y: 120 }, { x: 160, y: 120 }],
    [{ x: 60, y: 200 }, { x: 200, y: 200 }]
  ]},
  { id: 'F', uppercase: 'F', lowercase: 'f', phonetic: '/ef/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 200, y: 40 }],
    [{ x: 60, y: 120 }, { x: 160, y: 120 }]
  ]},
  { id: 'G', uppercase: 'G', lowercase: 'g', phonetic: '/dʒiː/', strokes: [
    [{ x: 200, y: 50 }, { x: 100, y: 90 }, { x: 100, y: 150 }, { x: 200, y: 190 }],
    [{ x: 200, y: 120 }, { x: 140, y: 120 }, { x: 140, y: 150 }]
  ]},
  { id: 'H', uppercase: 'H', lowercase: 'h', phonetic: '/eɪtʃ/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 220, y: 40 }, { x: 220, y: 200 }],
    [{ x: 60, y: 120 }, { x: 220, y: 120 }]
  ]},
  { id: 'I', uppercase: 'I', lowercase: 'i', phonetic: '/aɪ/', strokes: [
    [{ x: 140, y: 40 }, { x: 140, y: 200 }]
  ]},
  { id: 'J', uppercase: 'J', lowercase: 'j', phonetic: '/dʒeɪ/', strokes: [
    [{ x: 160, y: 40 }, { x: 160, y: 160 }, { x: 120, y: 190 }, { x: 80, y: 160 }]
  ]},
  { id: 'K', uppercase: 'K', lowercase: 'k', phonetic: '/keɪ/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 200, y: 40 }, { x: 60, y: 120 }],
    [{ x: 80, y: 120 }, { x: 220, y: 200 }]
  ]},
  { id: 'L', uppercase: 'L', lowercase: 'l', phonetic: '/el/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 200 }, { x: 200, y: 200 }]
  ]},
  { id: 'M', uppercase: 'M', lowercase: 'm', phonetic: '/em/', strokes: [
    [{ x: 50, y: 200 }, { x: 50, y: 40 }],
    [{ x: 50, y: 40 }, { x: 140, y: 140 }, { x: 230, y: 40 }],
    [{ x: 230, y: 40 }, { x: 230, y: 200 }]
  ]},
  { id: 'N', uppercase: 'N', lowercase: 'n', phonetic: '/en/', strokes: [
    [{ x: 50, y: 200 }, { x: 50, y: 40 }],
    [{ x: 50, y: 40 }, { x: 230, y: 200 }],
    [{ x: 230, y: 200 }, { x: 230, y: 40 }]
  ]},
  { id: 'O', uppercase: 'O', lowercase: 'o', phonetic: '/əʊ/', strokes: [
    [{ x: 140, y: 40 }, { x: 40, y: 120 }, { x: 140, y: 200 }, { x: 240, y: 120 }, { x: 140, y: 40 }]
  ]},
  { id: 'P', uppercase: 'P', lowercase: 'p', phonetic: '/piː/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 190, y: 55 }, { x: 210, y: 95 }, { x: 190, y: 135 }, { x: 60, y: 150 }]
  ]},
  { id: 'Q', uppercase: 'Q', lowercase: 'q', phonetic: '/kjuː/', strokes: [
    [{ x: 140, y: 40 }, { x: 40, y: 120 }, { x: 140, y: 200 }, { x: 240, y: 120 }, { x: 140, y: 40 }],
    [{ x: 170, y: 160 }, { x: 230, y: 220 }]
  ]},
  { id: 'R', uppercase: 'R', lowercase: 'r', phonetic: '/ɑː(r)/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 40 }, { x: 180, y: 45 }, { x: 200, y: 100 }, { x: 60, y: 120 }],
    [{ x: 60, y: 120 }, { x: 220, y: 200 }]
  ]},
  { id: 'S', uppercase: 'S', lowercase: 's', phonetic: '/es/', strokes: [
    [{ x: 200, y: 50 }, { x: 80, y: 50 }, { x: 60, y: 100 }, { x: 200, y: 140 }, { x: 220, y: 190 }, { x: 80, y: 200 }]
  ]},
  { id: 'T', uppercase: 'T', lowercase: 't', phonetic: '/tiː/', strokes: [
    [{ x: 60, y: 40 }, { x: 220, y: 40 }],
    [{ x: 140, y: 40 }, { x: 140, y: 200 }]
  ]},
  { id: 'U', uppercase: 'U', lowercase: 'u', phonetic: '/juː/', strokes: [
    [{ x: 60, y: 40 }, { x: 60, y: 150 }, { x: 140, y: 200 }, { x: 220, y: 150 }, { x: 220, y: 40 }]
  ]},
  { id: 'V', uppercase: 'V', lowercase: 'v', phonetic: '/viː/', strokes: [
    [{ x: 60, y: 40 }, { x: 140, y: 200 }],
    [{ x: 140, y: 200 }, { x: 220, y: 40 }]
  ]},
  { id: 'W', uppercase: 'W', lowercase: 'w', phonetic: '/ˈdʌbljuː/', strokes: [
    [{ x: 40, y: 40 }, { x: 90, y: 200 }],
    [{ x: 90, y: 200 }, { x: 140, y: 100 }],
    [{ x: 140, y: 100 }, { x: 190, y: 200 }],
    [{ x: 190, y: 200 }, { x: 240, y: 40 }]
  ]},
  { id: 'X', uppercase: 'X', lowercase: 'x', phonetic: '/eks/', strokes: [
    [{ x: 60, y: 40 }, { x: 220, y: 200 }],
    [{ x: 220, y: 40 }, { x: 60, y: 200 }]
  ]},
  { id: 'Y', uppercase: 'Y', lowercase: 'y', phonetic: '/waɪ/', strokes: [
    [{ x: 60, y: 40 }, { x: 140, y: 120 }],
    [{ x: 220, y: 40 }, { x: 140, y: 120 }],
    [{ x: 140, y: 120 }, { x: 140, y: 200 }]
  ]},
  { id: 'Z', uppercase: 'Z', lowercase: 'z', phonetic: '/zed/', strokes: [
    [{ x: 60, y: 40 }, { x: 220, y: 40 }],
    [{ x: 220, y: 40 }, { x: 60, y: 200 }],
    [{ x: 60, y: 200 }, { x: 220, y: 200 }]
  ]},
];

export const animals: LearningItem[] = [
  { id: 'cat', name: 'Cat', chinese: '猫', image: '🐱' },
  { id: 'dog', name: 'Dog', chinese: '狗', image: '🐶' },
  { id: 'elephant', name: 'Elephant', chinese: '大象', image: '🐘' },
  { id: 'lion', name: 'Lion', chinese: '狮子', image: '🦁' },
  { id: 'tiger', name: 'Tiger', chinese: '老虎', image: '🐯' },
  { id: 'rabbit', name: 'Rabbit', chinese: '兔子', image: '🐰' },
  { id: 'bear', name: 'Bear', chinese: '熊', image: '🐻' },
  { id: 'monkey', name: 'Monkey', chinese: '猴子', image: '🐵' },
  { id: 'panda', name: 'Panda', chinese: '熊猫', image: '🐼' },
  { id: 'fox', name: 'Fox', chinese: '狐狸', image: '🦊' },
  { id: 'wolf', name: 'Wolf', chinese: '狼', image: '🐺' },
  { id: 'horse', name: 'Horse', chinese: '马', image: '🐴' },
  { id: 'cow', name: 'Cow', chinese: '奶牛', image: '🐄' },
  { id: 'pig', name: 'Pig', chinese: '猪', image: '🐷' },
  { id: 'sheep', name: 'Sheep', chinese: '绵羊', image: '🐑' },
  { id: 'chicken', name: 'Chicken', chinese: '鸡', image: '🐔' },
  { id: 'duck', name: 'Duck', chinese: '鸭子', image: '🦆' },
  { id: 'bird', name: 'Bird', chinese: '鸟', image: '🐦' },
  { id: 'fish', name: 'Fish', chinese: '鱼', image: '🐟' },
  { id: 'butterfly', name: 'Butterfly', chinese: '蝴蝶', image: '🦋' },
];

export const plants: LearningItem[] = [
  { id: 'flower', name: 'Flower', chinese: '花', image: '🌸' },
  { id: 'tree', name: 'Tree', chinese: '树', image: '🌳' },
  { id: 'rose', name: 'Rose', chinese: '玫瑰', image: '🌹' },
  { id: 'sunflower', name: 'Sunflower', chinese: '向日葵', image: '🌻' },
  { id: 'tulip', name: 'Tulip', chinese: '郁金香', image: '🌷' },
  { id: 'grass', name: 'Grass', chinese: '草', image: '🌿' },
  { id: 'leaf', name: 'Leaf', chinese: '叶子', image: '🍃' },
  { id: 'mushroom', name: 'Mushroom', chinese: '蘑菇', image: '🍄' },
  { id: 'cactus', name: 'Cactus', chinese: '仙人掌', image: '🌵' },
  { id: 'palm', name: 'Palm Tree', chinese: '棕榈树', image: '🌴' },
  { id: 'cherry', name: 'Cherry Blossom', chinese: '樱花', image: '🌸' },
  { id: 'herb', name: 'Herb', chinese: '草本植物', image: '🌱' },
  { id: 'bamboo', name: 'Bamboo', chinese: '竹子', image: '🎋' },
  { id: 'clover', name: 'Clover', chinese: '三叶草', image: '🍀' },
  { id: 'maple', name: 'Maple Leaf', chinese: '枫叶', image: '🍁' },
];

export const objects: LearningItem[] = [
  { id: 'book', name: 'Book', chinese: '书', image: '📚' },
  { id: 'pencil', name: 'Pencil', chinese: '铅笔', image: '✏️' },
  { id: 'schoolbag', name: 'Schoolbag', chinese: '书包', image: '🎒' },
  { id: 'ball', name: 'Ball', chinese: '球', image: '⚽' },
  { id: 'car', name: 'Car', chinese: '汽车', image: '🚗' },
  { id: 'bike', name: 'Bicycle', chinese: '自行车', image: '🚲' },
  { id: 'clock', name: 'Clock', chinese: '时钟', image: '⏰' },
  { id: 'lamp', name: 'Lamp', chinese: '灯', image: '💡' },
  { id: 'chair', name: 'Chair', chinese: '椅子', image: '🪑' },
  { id: 'table', name: 'Table', chinese: '桌子', image: '🪵' },
  { id: 'cup', name: 'Cup', chinese: '杯子', image: '🥤' },
  { id: 'phone', name: 'Phone', chinese: '手机', image: '📱' },
  { id: 'tv', name: 'TV', chinese: '电视', image: '📺' },
  { id: 'computer', name: 'Computer', chinese: '电脑', image: '💻' },
  { id: 'camera', name: 'Camera', chinese: '相机', image: '📷' },
  { id: 'umbrella', name: 'Umbrella', chinese: '雨伞', image: '☂️' },
  { id: 'hat', name: 'Hat', chinese: '帽子', image: '🧢' },
  { id: 'shoe', name: 'Shoe', chinese: '鞋子', image: '👟' },
];

export const speakingScenes: SpeakingScene[] = [
  {
    id: 'greetings',
    name: 'greetings',
    title: '日常问候',
    icon: '👋',
    dialogues: [
      { id: 'g1', speaker: 'A', text: 'Hello!', translation: '你好！' },
      { id: 'g2', speaker: 'B', text: 'Hi! How are you?', translation: '嗨！你好吗？' },
      { id: 'g3', speaker: 'A', text: 'I\'m fine, thank you!', translation: '我很好，谢谢！' },
      { id: 'g4', speaker: 'B', text: 'Nice to meet you!', translation: '很高兴认识你！' },
      { id: 'g5', speaker: 'A', text: 'Nice to meet you too!', translation: '我也很高兴认识你！' },
      { id: 'g6', speaker: 'B', text: 'Goodbye!', translation: '再见！' },
      { id: 'g7', speaker: 'A', text: 'See you later!', translation: '回头见！' },
    ],
  },
  {
    id: 'housework',
    name: 'housework',
    title: '做家务',
    icon: '🧹',
    dialogues: [
      { id: 'h1', speaker: 'Mom', text: 'Can you help me clean the room?', translation: '你能帮我打扫房间吗？' },
      { id: 'h2', speaker: 'Kid', text: 'Sure! What should I do?', translation: '当然！我该做什么？' },
      { id: 'h3', speaker: 'Mom', text: 'Please sweep the floor.', translation: '请扫地。' },
      { id: 'h4', speaker: 'Kid', text: 'OK, I\'m done!', translation: '好的，我做完了！' },
      { id: 'h5', speaker: 'Mom', text: 'Great job! Now let\'s water the plants.', translation: '做得好！现在我们来给植物浇水吧。' },
      { id: 'h6', speaker: 'Kid', text: 'I love watering plants!', translation: '我喜欢给植物浇水！' },
    ],
  },
  {
    id: 'travel',
    name: 'travel',
    title: '旅游',
    icon: '✈️',
    dialogues: [
      { id: 't1', speaker: 'Dad', text: 'Are you ready for our trip?', translation: '准备好我们的旅行了吗？' },
      { id: 't2', speaker: 'Kid', text: 'Yes! I\'m so excited!', translation: '是的！我太兴奋了！' },
      { id: 't3', speaker: 'Dad', text: 'Let\'s take a picture.', translation: '我们来拍张照吧。' },
      { id: 't4', speaker: 'Kid', text: 'Cheese!', translation: '茄子！' },
      { id: 't5', speaker: 'Dad', text: 'Look at the beautiful view!', translation: '看这美丽的景色！' },
      { id: 't6', speaker: 'Kid', text: 'Wow, it\'s amazing!', translation: '哇，太棒了！' },
    ],
  },
  {
    id: 'zoo',
    name: 'zoo',
    title: '动物园',
    icon: '🦁',
    dialogues: [
      { id: 'z1', speaker: 'Kid', text: 'Look at the lion!', translation: '看那只狮子！' },
      { id: 'z2', speaker: 'Mom', text: 'It\'s so big!', translation: '它好大啊！' },
      { id: 'z3', speaker: 'Kid', text: 'What does it eat?', translation: '它吃什么？' },
      { id: 'z4', speaker: 'Mom', text: 'It eats meat.', translation: '它吃肉。' },
      { id: 'z5', speaker: 'Kid', text: 'Let\'s see the elephants!', translation: '我们去看大象吧！' },
      { id: 'z6', speaker: 'Mom', text: 'OK, let\'s go!', translation: '好的，走吧！' },
    ],
  },
  {
    id: 'garden',
    name: 'garden',
    title: '植物园',
    icon: '🌺',
    dialogues: [
      { id: 'p1', speaker: 'Kid', text: 'What a beautiful flower!', translation: '多美的花啊！' },
      { id: 'p2', speaker: 'Teacher', text: 'It\'s a rose.', translation: '这是玫瑰。' },
      { id: 'p3', speaker: 'Kid', text: 'It smells nice!', translation: '闻起来好香！' },
      { id: 'p4', speaker: 'Teacher', text: 'Look at the tall tree.', translation: '看那棵高大的树。' },
      { id: 'p5', speaker: 'Kid', text: 'Can I touch the leaves?', translation: '我可以摸叶子吗？' },
      { id: 'p6', speaker: 'Teacher', text: 'Yes, gently please.', translation: '可以，请轻轻摸。' },
    ],
  },
];
