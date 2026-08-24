export const socialTemplates = {
  auction_new: (data: {
    productName: string;
    startPrice: string;
    endTime: string;
    link: string;
    imageUrl?: string;
  }) => ({
    text: `🔨 NEW AUCTION: ${data.productName}\n\nStarting bid: ${data.startPrice}\nBidding closes: ${data.endTime}\n\nBid now → ${data.link}\n\n#Gemstones #Minerals #Auction #AfricanGems #Crystals #Fossils`,
    image: data.imageUrl,
  }),

  auction_ending: (data: {
    productName: string;
    currentBid: string;
    timeLeft: string;
    link: string;
  }) => ({
    text: `⏰ ENDING SOON: ${data.productName}\n\nCurrent bid: ${data.currentBid}\nOnly ${data.timeLeft} remaining!\n\nDon't miss out → ${data.link}\n\n#Gemstones #Auction #Bidding #LiveAuction`,
    image: undefined,
  }),

  live_sale: (data: {
    title: string;
    link: string;
    imageUrl?: string;
  }) => ({
    text: `🔴 GOING LIVE in 15 minutes!\n\n${data.title}\nJoin us for exclusive gemstone deals\n\nWatch here → ${data.link}\n\n#LiveSale #Gemstones #Crystals #Minerals #LiveAuction`,
    image: data.imageUrl,
  }),

  auction_result: (data: {
    productName: string;
    finalPrice: string;
    siteLink: string;
  }) => ({
    text: `🏆 SOLD: ${data.productName}\n\nFinal price: ${data.finalPrice}\nThank you to all bidders!\n\nSee more auctions → ${data.siteLink}\n\n#Sold #Gemstones #Minerals #AuctionResults`,
    image: undefined,
  }),

  new_arrival: (data: {
    productName: string;
    origin: string;
    priceText: string;
    link: string;
    imageUrl?: string;
  }) => ({
    text: `✨ NEW ARRIVAL\n\n${data.productName} — ${data.origin}\n${data.priceText}\n\nView details → ${data.link}\n\n#NewArrival #Gemstones #Minerals #Crystals #AfricanGems`,
    image: data.imageUrl,
  }),
};

export type SocialEventType = keyof typeof socialTemplates;

export function generateSocialPost(
  eventType: SocialEventType,
  // eslint-disable-next-line
  data: any
): { text: string; image?: string } {
  const template = socialTemplates[eventType];
  if (!template) {
    throw new Error(`Unknown event type: ${eventType}`);
  }
  return template(data);
}
