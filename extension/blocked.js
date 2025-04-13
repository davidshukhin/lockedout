// blocked.js
// @ts-check

/** 
 * @typedef {{ title: string, quote: string, icon: string }} Quote 
 */

/** @type {Quote[]} */
const quotes = [
    {
      "title": "Focus on the Present",
      "quote": "Stay in the moment and let each breath remind you of life's beauty. — Thich Nhat Hanh",
      "icon": "🧘"
    },
    {
      "title": "Embrace the Now",
      "quote": "Every second is a new beginning—cherish it. — Lao Tzu",
      "icon": "⏳"
    },
    {
      "title": "Mindful Steps",
      "quote": "Step by step, find calm in the rhythm of your pace.",
      "icon": "👣"
    },
    {
      "title": "Inner Calm",
      "quote": "Quiet your mind and let your heart speak. — Buddha",
      "icon": "🕊️"
    },
    {
      "title": "Soulful Awakening",
      "quote": "Awaken your soul with each moment of genuine presence.",
      "icon": "🌅"
    },
    {
      "title": "Breathe Deeply",
      "quote": "Inhale courage, exhale doubt—every breath is a choice. — Rumi",
      "icon": "💨"
    },
    {
      "title": "Centered Self",
      "quote": "Find balance in the chaos by anchoring yourself in mindfulness.",
      "icon": "⚖️"
    },
    {
      "title": "Radiant Focus",
      "quote": "Let your focus be the light that guides you through shadows.",
      "icon": "🌟"
    },
    {
      "title": "Serene Awareness",
      "quote": "Awareness brings clarity; embrace it with a calm mind.",
      "icon": "🧘"
    },
    {
      "title": "Peace in the Present",
      "quote": "Let go of past regrets and future worries, and find peace today.",
      "icon": "🌿"
    },
    {
      "title": "Gentle Persistence",
      "quote": "Persist with kindness to yourself and thrive in mindfulness.",
      "icon": "🚶"
    },
    {
      "title": "Empowered Stillness",
      "quote": "True strength comes from a quiet, centered mind.",
      "icon": "🙇"
    },
    {
      "title": "Calm Amidst Storm",
      "quote": "Even in turbulence, a mindful heart can create a quiet haven.",
      "icon": "🌪️"
    },
    {
      "title": "Inner Sanctuary",
      "quote": "Create a sanctuary within; let each moment become a retreat.",
      "icon": "🏡"
    },
    {
      "title": "Mind Over Matter",
      "quote": "Transform challenges into lessons with mindful reflection. — Bruce Lee",
      "icon": "🧠"
    },
    {
      "title": "Intentional Living",
      "quote": "Live intentionally, every thought a seed for a beautiful future.",
      "icon": "🎯"
    },
    {
      "title": "Serenity Now",
      "quote": "Let a serene mind lead you to a joyful life.",
      "icon": "🧘‍♂️"
    },
    {
      "title": "Quiet Power",
      "quote": "Find the power of silence in every mindful pause. — Dalai Lama",
      "icon": "🤫"
    },
    {
      "title": "Soul Focus",
      "quote": "Focus not on the noise outside but on the wisdom within.",
      "icon": "💖"
    },
    {
      "title": "Calm Reflections",
      "quote": "Reflect calmly, and let your inner truths shine.",
      "icon": "🪞"
    },
    {
      "title": "Steady Mind",
      "quote": "A steady mind paves the way for enlightened decisions.",
      "icon": "🛤️"
    },
    {
      "title": "Present Possibilities",
      "quote": "The present moment holds endless possibilities waiting to bloom.",
      "icon": "🌱"
    },
    {
      "title": "Inner Journey",
      "quote": "Embark on an inner journey where peace meets purpose.",
      "icon": "🚀"
    },
    {
      "title": "Mindful Resilience",
      "quote": "Resilience begins with accepting each moment as it comes.",
      "icon": "🛡️"
    },
    {
      "title": "Tranquil Thoughts",
      "quote": "Allow your thoughts to settle like soft whispers in the wind.",
      "icon": "💭"
    },
    {
      "title": "Awakened Spirit",
      "quote": "Let your spirit be awakened by every mindful moment.",
      "icon": "✨"
    },
    {
      "title": "Compassionate Awareness",
      "quote": "When you are kind to yourself, mindful awareness blossoms.",
      "icon": "🤲"
    },
    {
      "title": "Harmony Within",
      "quote": "Find the notes of harmony in the quiet space of your heart.",
      "icon": "🎶"
    },
    {
      "title": "Stillness Speaks",
      "quote": "Listen closely—stillness often speaks the loudest truths.",
      "icon": "🤫"
    },
    {
      "title": "Daily Renewal",
      "quote": "Every day is a chance for renewal when you live mindfully. — Mahatma Gandhi",
      "icon": "🌞"
    },
    {
      "title": "Mindful Gratitude",
      "quote": "Gratitude transforms ordinary moments into extraordinary blessings.",
      "icon": "🙏"
    },
    {
      "title": "Serenity in Action",
      "quote": "Action with mindful intention leads to serene outcomes.",
      "icon": "🏃‍♂️"
    },
    {
      "title": "Conscious Moments",
      "quote": "Stay conscious in every moment; live life with clarity.",
      "icon": "🔔"
    },
    {
      "title": "Inner Strength",
      "quote": "Cultivate your inner strength with the power of mindfulness.",
      "icon": "🏋️‍♀️"
    },
    {
      "title": "Light Within",
      "quote": "Let the light within guide your steps through the darkest paths.",
      "icon": "💡"
    },
    {
      "title": "Purposeful Presence",
      "quote": "Be purposefully present; every moment is a gift. — Eckhart Tolle",
      "icon": "🎁"
    },
    {
      "title": "Mindful Bravery",
      "quote": "Face your fears with a mindful and brave heart.",
      "icon": "🦁"
    },
    {
      "title": "Reflect and Renew",
      "quote": "Take time to reflect, so you can renew your spirit.",
      "icon": "♻️"
    },
    {
      "title": "Clarity of Mind",
      "quote": "Clarity starts with a calm, undisturbed mind.",
      "icon": "🔆"
    },
    {
      "title": "Peaceful Resolutions",
      "quote": "Resolve conflicts with peace, rooted in mindfulness.",
      "icon": "🕊️"
    },
    {
      "title": "Balanced Living",
      "quote": "Balance your thoughts, and you'll find the wisdom to move forward. — Confucius",
      "icon": "⚖️"
    },
    {
      "title": "Resilient Heart",
      "quote": "A mindful heart is resilient and ever-growing.",
      "icon": "❤️"
    },
    {
      "title": "Intentional Silence",
      "quote": "Sometimes, the quiet moments reveal the loudest truths.",
      "icon": "🤐"
    },
    {
      "title": "Empowered Presence",
      "quote": "Being fully present empowers you to conquer any challenge.",
      "icon": "🚀"
    },
    {
      "title": "Mindful Horizons",
      "quote": "Set your sights on the horizon and let each day inspire you.",
      "icon": "🌄"
    },
    {
      "title": "Serenity in Simplicity",
      "quote": "Simplicity holds the key to a peaceful, mindful life.",
      "icon": "🍃"
    },
    {
      "title": "Calm Determination",
      "quote": "Determination grows stronger when nurtured by a calm mind.",
      "icon": "🔥"
    },
    {
      "title": "Present Joy",
      "quote": "Find joy in the little moments that make up your day.",
      "icon": "😊"
    },
    {
      "title": "Focused Energy",
      "quote": "Direct your energy to the present, and greatness will follow. — Oprah Winfrey",
      "icon": "⚡"
    },
    {
      "title": "Inner Peace",
      "quote": "Peace is found not in doing, but in being fully present.",
      "icon": "☮️"
    },
    {
      "title": "Mindful Miracles",
      "quote": "Miracles appear in the mindful moments of everyday life. — Nelson Mandela",
      "icon": "🌈"
    },
    {
      "title": "Steadfast Presence",
      "quote": "Stand firm in the moment, and let your spirit soar.",
      "icon": "🗿"
    },
    {
      "title": "Gentle Courage",
      "quote": "Courage is gentle when nurtured by mindful stillness.",
      "icon": "💪"
    },
    {
      "title": "Radiant Serenity",
      "quote": "Serenity radiates from within when you listen to your heart.",
      "icon": "🌟"
    },
    {
      "title": "Mindful Empowerment",
      "quote": "Empower yourself each day by embracing every mindful moment.",
      "icon": "🚀"
    },
    {
      "title": "Inner Wisdom",
      "quote": "Trust your inner wisdom to guide you through life's puzzles. — Socrates",
      "icon": "🦉"
    },
    {
      "title": "Present Strength",
      "quote": "Your strength lies in embracing the power of now. — Confucius",
      "icon": "💪"
    },
    {
      "title": "Quiet Confidence",
      "quote": "Confidence grows in the quiet moments of reflection.",
      "icon": "😌"
    },
    {
      "title": "Awakened Mind",
      "quote": "An awakened mind sees beauty in every unfolding moment.",
      "icon": "🚀"
    },
    {
      "title": "Mindful Momentum",
      "quote": "Keep moving forward by staying present in each step.",
      "icon": "➡️"
    },
    {
      "title": "Tranquil Energy",
      "quote": "Let tranquil energy flow, transforming stress into calm.",
      "icon": "💫"
    },
    {
      "title": "Purposeful Peace",
      "quote": "Find peace in the clarity of your purpose.",
      "icon": "☯️"
    },
    {
      "title": "Calm Resolve",
      "quote": "Resolve to live in the moment, and the path will reveal itself.",
      "icon": "💪"
    },
    {
      "title": "Mindful Intent",
      "quote": "Set clear intentions and let mindfulness guide your actions.",
      "icon": "📝"
    },
    {
      "title": "Soulful Patience",
      "quote": "Patience is a soulful art nurtured by a mindful heart.",
      "icon": "⏳"
    },
    {
      "title": "Centered Vision",
      "quote": "Hold a clear vision in your heart while staying grounded in the moment.",
      "icon": "👁️"
    },
    {
      "title": "Inspired Focus",
      "quote": "Let inspiration spark from every moment of focused awareness. — Steve Jobs",
      "icon": "🚀"
    },
    {
      "title": "Unwavering Presence",
      "quote": "Stand unwavering in the present, and let your true self shine.",
      "icon": "👑"
    },
    {
      "title": "Mindful Renewal",
      "quote": "Renew your spirit each day by embracing the present fully.",
      "icon": "🔄"
    },
    {
      "title": "Serene Focus",
      "quote": "Focus with serenity, and watch your worries melt away.",
      "icon": "🎯"
    },
    {
      "title": "Inner Alignment",
      "quote": "Align your mind and heart by truly living each moment.",
      "icon": "⚙️"
    },
    {
      "title": "Mindful Journey",
      "quote": "Every journey begins with a mindful step into the now.",
      "icon": "🛤️"
    },
    {
      "title": "Clarity Through Calm",
      "quote": "Calm your mind and watch clarity emerge from within.",
      "icon": "💎"
    },
    {
      "title": "Heartfelt Presence",
      "quote": "Let your heartfelt presence transform ordinary moments into magic.",
      "icon": "❤️"
    },
    {
      "title": "Stillness Inside",
      "quote": "Discover the power of stillness and let it guide your day.",
      "icon": "🕯️"
    },
    {
      "title": "Energized by Now",
      "quote": "Empower your energy by living fully in each moment.",
      "icon": "⚡"
    },
    {
      "title": "Mindful Gratification",
      "quote": "Savor the little wins and let gratitude fuel your focus.",
      "icon": "😇"
    },
    {
      "title": "Grounded Aspirations",
      "quote": "Stay grounded while aiming high—mindfulness holds the key.",
      "icon": "🌳"
    },
    {
      "title": "Quiet Resilience",
      "quote": "Resilience begins with quiet strength nurtured in mindful moments.",
      "icon": "🧱"
    },
    {
      "title": "Present Brilliance",
      "quote": "Your brilliance shines when you embrace every moment with passion.",
      "icon": "💫"
    },
    {
      "title": "Awareness in Action",
      "quote": "Transform awareness into action and watch your dreams unfold.",
      "icon": "⚙️"
    },
    {
      "title": "Mindful Motivation",
      "quote": "Let mindfulness be the fuel that drives your motivation.",
      "icon": "🚀"
    },
    {
      "title": "Serenity Unleashed",
      "quote": "Unleash your inner serenity to overcome every obstacle.",
      "icon": "🕊️"
    },
    {
      "title": "Resolute Calm",
      "quote": "Face challenges with the calm determination that lives within you.",
      "icon": "🛡️"
    },
    {
      "title": "Centered Ambition",
      "quote": "Keep your ambitions high, but always remain centered in the now.",
      "icon": "🎯"
    },
    {
      "title": "Mindful Spark",
      "quote": "A single moment of mindfulness can ignite extraordinary change.",
      "icon": "✨"
    },
    {
      "title": "Grace in the Present",
      "quote": "Live with grace in every moment, letting mindfulness guide you.",
      "icon": "🌸"
    },
    {
      "title": "Focused Serenity",
      "quote": "Hold tight to serenity by remaining fully aware in each breath.",
      "icon": "🧘"
    },
    {
      "title": "Inner Harmony",
      "quote": "Seek harmony within to create a peaceful, mindful life.",
      "icon": "🎼"
    },
    {
      "title": "Mindful Flight",
      "quote": "Let your thoughts soar as you stay anchored in the moment.",
      "icon": "🕊️"
    },
    {
      "title": "Resilient Mind",
      "quote": "A resilient mind knows how to find calm amidst chaos.",
      "icon": "🧠"
    },
    {
      "title": "Inspirational Focus",
      "quote": "Focus on inspiration and let it light your path forward.",
      "icon": "🌟"
    },
    {
      "title": "Empowered Insight",
      "quote": "Gain clarity and power from each mindful reflection.",
      "icon": "💡"
    },
    {
      "title": "Steady Within",
      "quote": "Build inner strength by staying steady and aware in all you do.",
      "icon": "🧘‍♂️"
    },
    {
      "title": "Reflective Courage",
      "quote": "Courage grows from the seeds of reflection and mindful insight.",
      "icon": "🦁"
    },
    {
      "title": "Harmonious Journey",
      "quote": "Travel the path of life with harmony and deliberate mindfulness.",
      "icon": "🌈"
    },
    {
      "title": "Focused Presence",
      "quote": "Let your focus anchor you in the beauty of every moment.",
      "icon": "👁️"
    },
    {
      "title": "Soulful Expedition",
      "quote": "Embark on a soulful expedition, where every step reveals inner treasures.",
      "icon": "🌍"
    },
    {
      "title": "Calm and Collected",
      "quote": "Face each day with a calm heart and collected thoughts.",
      "icon": "🌾"
    },
    {
      "title": "Present Clarity",
      "quote": "Clarity is born from being fully present and aware.",
      "icon": "🔍"
    }
  ];
  
  
/**
 * Returns a random quote from the quotes array.
 * @returns {Quote}
 */
function getRandomQuote() {
  // Select a random quote from the array.
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Explicitly check if a quote was found.
  if (!randomQuote) {
    // If, for any reason, the array is empty, throw an error.
    throw new Error("No quotes available.");
  }
  return randomQuote;
}// Define 30 deep, muted colors for a moody, refined vibe.
const calmColors = [
  "#344955", "#2C3A47", "#37474F", "#2F3A44", "#263238", "#3C4F5C",
  "#355C7D", "#34495E", "#3B3A30", "#3E4C59", "#4A4B48", "#4C3A51",
  "#2A2D34", "#5D576B", "#48494D", "#3C3F41", "#525C56", "#3F4E4A",
  "#4C5D53", "#485C63", "#6C5B7B", "#6B7B8C", "#5C6B73", "#4E5656",
  "#424B54", "#36454F", "#4A6572", "#516B78", "#607D8B", "#2E4057"
];

/**
 * Returns a random color from the calmColors array.
 * If the array is empty (should never happen), returns a fallback color.
 * @returns {string}
 */
function getRandomColor() {
  // If the array is empty, return a fallback color.
  if (calmColors.length === 0) {
    return "#000000";
  }
  const index = Math.floor(Math.random() * calmColors.length);
  const color = calmColors[index];
  // Explicitly check if the color is undefined, and return a fallback if so.
  if (typeof color !== "string") {
    return "#000000";
  }
  return color;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Get the blocked URL from the current tab
  const url = new URL(window.location.href);
  const blockedUrl = url.searchParams.get('url') || 'this site';
  
  // Update blocked site information
  const blockedSiteInfo = document.getElementById('blockedSiteInfo');
  if (blockedSiteInfo) {
    blockedSiteInfo.textContent = new URL(blockedUrl).hostname;
  }

  // Get block list and session info
  try {
    const storage = await chrome.storage.local.get(['BLOCK_LIST', 'AUTH_SESSION']);
    const blockList = storage.BLOCK_LIST || [];
    const session = storage.AUTH_SESSION;

    // Update UI with user context if available
    const userContext = document.getElementById('userContext');
    if (userContext && session?.user) {
      userContext.textContent = `Signed in as ${session.user.email}`;
    }

    // Update block list context
    const blockListContext = document.getElementById('blockListContext');
    if (blockListContext) {
      blockListContext.innerHTML = `
        <p>You currently have ${blockList.length} site${blockList.length === 1 ? '' : 's'} blocked:</p>
        <ul>
          ${blockList.map(site => `<li>${site}</li>`).join('')}
        </ul>
      `;
    }
  } catch (err) {
    console.error('Error loading block context:', err);
  }

  // Update block count
  const blockCount = document.getElementById('blockCount');
  if (blockCount) {
    let count = parseInt(localStorage.getItem('blockCount') || '0', 10);
    count++;
    localStorage.setItem('blockCount', count.toString());
    blockCount.textContent = count.toString();
  }

  // Handle unblock request
  const unblockButton = document.getElementById('unblockButton');
  if (unblockButton) {
    unblockButton.addEventListener('click', async () => {
      try {
        // Redirect to the block list management page
        chrome.tabs.create({
          url: 'http://localhost:3000/blocklist'
        });
      } catch (err) {
        console.error('Error handling unblock:', err);
      }
    });
  }

  // Retrieve a random quote.
  const selectedQuote = getRandomQuote();
  const title = selectedQuote.title;
  const quote = selectedQuote.quote;
  const icon = selectedQuote.icon;
  
  // Update the title element, if found.
  const titleEl = document.querySelector(".quote-title");
  if (titleEl) {
    titleEl.textContent = title;
  }
  
  // Update the quote subtitle element, if found.
  const subtitleEl = document.querySelector(".quote-subtitle");
  if (subtitleEl) {
    subtitleEl.textContent = quote;
  }
  
  // Update the icon element, if found.
  const iconEl = document.getElementById("iconDisplay");
  if (iconEl) {
    iconEl.textContent = icon;
  }
  
  // Randomly pick one of the calm colors and apply it.
  // Assume there is a container element (e.g., <div class="quote-container">) for your quote.
  const containerEl = document.querySelector(".quote-container");
  const randomColor = getRandomColor();
  // Check that containerEl is an HTMLElement so that it has the style property.
  if (containerEl instanceof HTMLElement) {
    containerEl.style.backgroundColor = randomColor;
  }
});

function playOn() {
  alert("Maybe try something beneficial? Practice an instrument, take a walk, or read a book!");
}

// Get DOM elements
const blockedSiteInfo = document.getElementById('blockedSiteInfo');
const quoteTitle = document.getElementById('quoteTitle');
const quoteSubtitle = document.getElementById('quoteSubtitle');
const iconDisplay = document.getElementById('iconDisplay');
const unblockButton = document.getElementById('unblockButton');
const blockCount = document.getElementById('blockCount');

// Get current URL
const currentUrl = new URL(window.location.href);
const blockedUrl = currentUrl.searchParams.get('url') || 'unknown site';

// Display blocked site info
if (blockedSiteInfo) {
  blockedSiteInfo.textContent = blockedUrl;
}

// Get and display random quote with animation
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Initial fade state
  if (quoteTitle) {
    quoteTitle.style.opacity = '0';
    quoteTitle.style.transform = 'translateY(20px)';
  }
  
  if (quoteSubtitle) {
    quoteSubtitle.style.opacity = '0';
    quoteSubtitle.style.transform = 'translateY(20px)';
  }
  
  // Wait for fade out, then update and fade in
  setTimeout(() => {
    if (quoteTitle) {
      quoteTitle.textContent = quote.title;
      quoteTitle.style.opacity = '1';
      quoteTitle.style.transform = 'translateY(0)';
    }
    
    if (quoteSubtitle) {
      quoteSubtitle.textContent = quote.quote;
      quoteSubtitle.style.opacity = '1';
      quoteSubtitle.style.transform = 'translateY(0)';
    }
    
    if (iconDisplay) {
      iconDisplay.style.transform = 'scale(0.8)';
      iconDisplay.textContent = quote.icon;
      // Trigger bounce animation
      setTimeout(() => {
        iconDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
          iconDisplay.style.transform = 'scale(1)';
        }, 150);
      }, 50);
    }
  }, 300);
}

// Add transition styles
document.addEventListener('DOMContentLoaded', () => {
  if (quoteTitle) {
    quoteTitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  
  if (quoteSubtitle) {
    quoteSubtitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  
  if (iconDisplay) {
    iconDisplay.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  }
  
  // Initial display
  displayRandomQuote();
});

// Change quote every minute with animation
setInterval(displayRandomQuote, 60000);

// Handle unblock button
if (unblockButton) {
  unblockButton.addEventListener('click', () => {
    // Open the extension popup or options page
    chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' });
  });
}

// Update block count
chrome.storage.local.get(['blockCount'], (result) => {
  const count = (result.blockCount || 0) + 1;
  chrome.storage.local.set({ blockCount: count });
  if (blockCount) blockCount.textContent = count.toString();
});