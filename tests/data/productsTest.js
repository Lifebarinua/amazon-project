import { Product, Clothing, Appliance } from '../../data/product.js';

describe('Product class', () => {
  it('creates a Product instance with correct properties', () => {
    const product = new Product({
      id: 'p1',
      image: 'image.jpg',
      name: 'Test Product',
      rating: { stars: 4, count: 100 },
      priceCents: 2500,
      keywords: ['test', 'sample']
    });

    expect(product.id).toBe('p1');
    expect(product.image).toBe('image.jpg');
    expect(product.name).toBe('Test Product');
    expect(product.rating.stars).toBe(4);
    expect(product.rating.count).toBe(100);
    expect(product.priceCents).toBe(2500);
    expect(product.keywords).toEqual(['test', 'sample']);
  });

  it('getStarsUrl returns correct URL', () => {
    const product = new Product({
      id: 'p1',
      image: 'image.jpg',
      name: 'Test Product',
      rating: { stars: 4, count: 100 },
      priceCents: 2500,
      keywords: []
    });

    expect(product.getStarsUrl()).toBe('images/ratings/rating-40.png');
  });

  it('getPrice formats the price correctly', () => {
    const product = new Product({
      id: 'p1',
      image: 'image.jpg',
      name: 'Test Product',
      rating: { stars: 4, count: 100 },
      priceCents: 2500,
      keywords: []
    });

    expect(product.getPrice()).toBe('$25.00');
  });

  it('extraInfoHTML returns an empty string', () => {
    const product = new Product({
      id: 'p1',
      image: 'image.jpg',
      name: 'Test Product',
      rating: { stars: 4, count: 100 },
      priceCents: 2500,
      keywords: []
    });

    expect(product.extraInfoHTML()).toBe('');
  });
});


describe('Clothing class', () => {
  it('creates a Clothing instance with correct properties', () => {
    const clothing = new Clothing({
      id: 'c1',
      image: 'shirt.jpg',
      name: 'Test Shirt',
      rating: { stars: 5, count: 50 },
      priceCents: 1500,
      keywords: ['shirt'],
      sizeChartLink: 'sizechart.png'
    });

    expect(clothing.id).toBe('c1');
    expect(clothing.sizeChartLink).toBe('sizechart.png');
  });

  it('extraInfoHTML returns link to size chart', () => {
    const clothing = new Clothing({
      id: 'c1',
      image: 'shirt.jpg',
      name: 'Test Shirt',
      rating: { stars: 5, count: 50 },
      priceCents: 1500,
      keywords: [],
      sizeChartLink: 'sizechart.png'
    });

    expect(clothing.extraInfoHTML()).toContain('href="sizechart.png"');
    expect(clothing.extraInfoHTML()).toContain('Size chart');
  });
});


describe('Appliance class', () => {
  it('creates an Appliance instance with correct properties', () => {
    const appliance = new Appliance({
      id: 'a1',
      image: 'toaster.jpg',
      name: 'Test Toaster',
      rating: { stars: 4.5, count: 200 },
      priceCents: 5000,
      keywords: ['kitchen'],
      instructionsLink: 'instructions.pdf',
      warrantyLink: 'warranty.pdf'
    });

    expect(appliance.id).toBe('a1');
    expect(appliance.instructionsLink).toBe('instructions.pdf');
    expect(appliance.warrantyLink).toBe('warranty.pdf');
  });

  it('extraInfoHTML returns links to instructions and warranty', () => {
    const appliance = new Appliance({
      id: 'a1',
      image: 'toaster.jpg',
      name: 'Test Toaster',
      rating: { stars: 4.5, count: 200 },
      priceCents: 5000,
      keywords: [],
      instructionsLink: 'instructions.pdf',
      warrantyLink: 'warranty.pdf'
    });

    expect(appliance.extraInfoHTML()).toContain('href="instructions.pdf"');
    expect(appliance.extraInfoHTML()).toContain('href="warranty.pdf"');
  });
});
