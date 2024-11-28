// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

export function run(input) {
  const cart = input.cart;

  // Check if cart and lines are valid
  if (!cart || !Array.isArray(cart.lines) || cart.lines.length === 0) {
    return {
      discountApplicationStrategy: "FIRST",
      discounts: []
    };
  }

  const spendThresholds = [
    { threshold: 300, discount: 0.20 },
    { threshold: 200, discount: 0.15 },
    { threshold: 100, discount: 0.10 }
  ];

  // Calculate total spend from cart lines
  const totalSpend = cart.lines.reduce((sum, line) => sum + parseFloat(line.cost.totalAmount.amount), 0);

  // Find the applicable discount based on total spend
  const discountRate = spendThresholds.find(t => totalSpend >= t.threshold)?.discount || 0;

  // If no discount applies, return empty discounts
  if (discountRate === 0) {
    return {
      discountApplicationStrategy: "FIRST",  // or use "FIRST" or another valid value here
      discounts: []
    };
  }

  // Map the lines to create discounts
  const discounts = cart.lines.map(line => ({
    targets: [{ productVariant: { id: line.merchandise.id } }],
    value: { percentage: { value: discountRate * 100 } },
    message: `You've received a $${discountRate * 100} discount!`
  }));

  // Return the correct structure
  return {
    discountApplicationStrategy: "FIRST",  // Ensure this is a string, as expected
    discounts
  };
}
