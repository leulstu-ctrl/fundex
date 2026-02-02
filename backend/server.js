const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Instant Funding Account Sizes and Base Prices
const instantFundingSizes = [
    {
        size: 6000,
        label: '$6,000',
        basePrice: 99
    },
    {
        size: 15000,
        label: '$15,000',
        basePrice: 199
    },
    {
        size: 25000,
        label: '$25,000',
        basePrice: 349
    },
    {
        size: 50000,
        label: '$50,000',
        basePrice: 649
    },
    {
        size: 100000,
        label: '$100,000',
        basePrice: 1199
    }
];

app.get('/api/plans', (req, res) => {
    const plans = instantFundingSizes.map(item => {
        // Apply 70% reduction (Pay only 30%)
        const discountedPrice = item.basePrice * 0.30;
        return {
            id: `instant-${item.size}`,
            name: 'Instant Funding',
            size: item.size,
            label: item.label,
            originalPrice: item.basePrice,
            price: Math.round(discountedPrice * 100) / 100, // Round to 2 decimals
            description: `Start trading with a ${item.label} account immediately.`
        };
    });
    res.json(plans);
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
