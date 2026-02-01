const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const basePlans = [
    {
        id: 'stellar-2-step',
        name: 'Stellar 2-Step',
        basePrice: 599, // Mocking a higher price typical for prop firms
        description: 'Two phase challenge'
    },
    {
        id: 'stellar-1-step',
        name: 'Stellar 1-Step',
        basePrice: 299,
        description: 'One phase challenge'
    },
    {
        id: 'stellar-lite',
        name: 'Stellar Lite',
        basePrice: 199,
        description: 'Lite version'
    },
    {
        id: 'stellar-instant',
        name: 'Stellar Instant',
        basePrice: 99,
        description: 'Instant funding'
    },
    {
        id: 'futures',
        name: 'Futures Plan',
        basePrice: 149,
        description: 'Futures trading'
    }
];

app.get('/api/plans', (req, res) => {
    const discountedPlans = basePlans.map(plan => {
        // Apply 70% reduction (Pay only 30%)
        const discountedPrice = plan.basePrice * 0.30;
        return {
            ...plan,
            originalPrice: plan.basePrice,
            price: Math.round(discountedPrice * 100) / 100 // Round to 2 decimals
        };
    });
    res.json(discountedPlans);
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
