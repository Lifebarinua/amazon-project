import { formatCurrency } from "../script/utils/money.js";

export class Product {
  constructor({
    id,
    image,
    name,
    rating,
    priceCents,
    keywords = [],
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.priceCents = priceCents;
    this.keywords = keywords;
  }

  getStarsUrl() {
    const roundedRating = Math.round(this.rating.stars * 2) / 2;
    return `images/ratings/rating-${roundedRating.toFixed(1).replace('.', '-')}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

export class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

export class Appliance extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a> |
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}
