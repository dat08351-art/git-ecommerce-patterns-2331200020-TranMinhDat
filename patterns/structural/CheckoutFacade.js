import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        console.log(`Inventory: ${inStock ? 'All items in stock.' : 'Out of stock!'}`);
        if (!inStock) return;
        const paymentSuccess = this.paymentService.processPayment(orderDetails.userId);
        console.log(`Payment: ${paymentSuccess ? 'Payment successful.' : 'Payment failed!'}`);
        if (!paymentSuccess) return;
        const shippingArranged = this.shippingService.arrangeShipping(orderDetails.shippingInfo);
        console.log(`Shipping: ${shippingArranged ? 'Shipping arranged.' : 'Shipping failed!'}`);
        if (!shippingArranged) return;
        console.log("Order placed successfully!");
    }
}

export { CheckoutFacade };
