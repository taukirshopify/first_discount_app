// @ts-check

export function run(input) {
    // Log the initial input to see the structure
    console.log("Input:", JSON.stringify(input, null, 2));
  
    const cart = input.cart;
  
    // Log the cart to see its structure
    console.log("Cart:", JSON.stringify(cart, null, 2));
  
    // Ensure cart and lines are valid
    if (!cart || !Array.isArray(cart.lines) || cart.lines.length === 0) {
      console.log("Cart lines are invalid or empty. Returning default output.");
      return {
        discountApplicationStrategy: "FIRST",  // Set as string "FIRST"
        discounts: []
      };
    }
  
    // Define the spend thresholds for discounts
    const spendThresholds = [
      { threshold: 300, discount: 0.20 },
      { threshold: 200, discount: 0.15 },
      { threshold: 100, discount: 0.10 }
    ];
  
    // Log the thresholds to make sure they are correct
    console.log("Spend Thresholds:", JSON.stringify(spendThresholds, null, 2));
  
    // Calculate total spend from cart lines
    const totalSpend = cart.lines.reduce((sum, line) => {
      console.log(`Processing line:`, JSON.stringify(line, null, 2));
      const amount = parseFloat(line.cost.totalAmount.amount);
      console.log(`Line total amount: ${amount}`);
      return sum + amount;
    }, 0);
  
    // Log the total spend calculation result
    console.log("Total Spend:", totalSpend);
  
    // Find the applicable discount based on total spend
    const discountRate = spendThresholds.find(t => totalSpend >= t.threshold)?.discount || 0;
  
    // Log the discount rate
    console.log("Discount Rate:", discountRate);
  
    // If no discount applies, return empty discounts
    if (discountRate === 0) {
      console.log("No discount applies. Returning default output.");
      return {
        discountApplicationStrategy: "FIRST",  // Set as string "FIRST"
        discounts: []
      };
    }
  
    // Map the lines to create discount objects
    const discounts = cart.lines.map(line => {
      console.log(`Creating discount for line:`, JSON.stringify(line, null, 2));
      const discount = {
        targets: [{ productVariant: { id: line.merchandise.id } }],
        value: { percentage: { value: discountRate * 100 } },
        message: `You've received a $${discountRate * 100} discount!`
      };
      console.log("Created discount:", JSON.stringify(discount, null, 2));
      return discount;
    });
  
    // Log the final discounts array
    console.log("Discounts:", JSON.stringify(discounts, null, 2));
  
    // Return the correct structure with discountApplicationStrategy as a string
    const result = {
      discountApplicationStrategy: "FIRST",  // This must be a string like "FIRST"
      discounts
    };
  
    // Log the final result
    console.log("Returning result:", JSON.stringify(result, null, 2));
  
    return result;
  }
  