const venues = [
    {
        vid: '0001',
        name: 'Lagent Plaza',
        contact: '(021) 35344665',
        description: "The Royal Rodale allows you to take a complete detour form the humdrum of a monotonous life and throw yourself in a world of excitements. Ideally located just near Sea-View Township touching the main residential phase of D.H.A. Phase 5 Ext, this three level facility is surely a unique and exotic treat for the fun-deprived Karachiites",
        additionalText: [
            { title: "" }
        ],
        rating: {
            overall: 4.9,
            service: 4,
            ambiance: 5,
            price: 4.6,
            food: 5,
            staff: 5,
            communication: 5
        },
        responseTime: { count: 1, unit: 'hour' },
        profileViewed: 106,
        operationalHours: { from: '12PM', to: '12AM' },
        country: 'Pakistan',
        city: 'Karachi',
        address: '38C Bukhari Commercial, Lane 8, D.H.A Phase 6 Ittehad Commercial Area Phase 6 Defence Housing Authority, Karachi, Karachi City, Sindh 75500',
        location: {
            lat: 1,
            log: 1
        },
        capacity: 300,
        mainPic: 'http://www.somethingperfectclt.com/wp-content/uploads/2018/08/Charlotte-Wedding-Planner-NC-wedding-Planner_0055.jpg',
        pics: [
            'http://venuehook.com/uploads/listing/1511261297IMG_4544%20%2001.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4549%20%2002.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4552%20%2003.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4553%20%2004.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4559%20%2005.jpg',
        ],
        dimention: { length: 100, width: 100, height: 100, unit: 'ft' },
        termsAndCondition: [
            'Minimum Guest Count 100 Guests.',
            'External catering is not allowed. Food will be billed separately as per selection from menu',
            'Venue Premises  is secured by  CCTV cameras',
            'Religious, Political, Public or commercial events are subject to approval from concerned',
            'Booking of venue will be confirmed on receiving of 30% advance payment at the time of booking'
        ],
        feature: [
            { atrName: 'AC Availability', type: 0, price: 5000 },
            { atrName: 'Food Availability', type: 0, price: 20000 },
            { atrName: 'DJ Availability', type: 0, price: 6000 },
            { atrName: 'Ramp Walk Availability', type: 0, price: 3000 },
            { atrName: 'Speacial Decoration', type: 0, price: 4000 },
            {
                atrName: 'Speacial Lighting', type: 1, option: [
                    { title: 'category one', price: 1000 },
                    { title: 'category two', price: 2000 },
                    { title: 'category three', price: 3000 },
                ]
            },
        ],
        bestSuitableFor: [
            'Festival',
            'Fashion Show',
            'Music / Gig'
        ],
        venueTypes: 2,
        basicCost: 30000,
        totatCost: 1 //this should be generate by accoring to features and basicCost
    },
    {
        vid: '0002',
        name: 'Global Marque',
        contact: '(021) 35344665',
        description: "The Royal Rodale allows you to take a complete detour form the humdrum of a monotonous life and throw yourself in a world of excitements. Ideally located just near Sea-View Township touching the main residential phase of D.H.A. Phase 5 Ext, this three level facility is surely a unique and exotic treat for the fun-deprived Karachiites",
        additionalText: [
            { title: "" }
        ],
        rating: {
            overall: 4.9,
            service: 4,
            ambiance: 5,
            price: 4.6,
            food: 5,
            staff: 5,
            communication: 5
        },
        responseTime: { count: 1, unit: 'hour' },
        profileViewed: 690,
        operationalHours: { from: '12PM', to: '12AM' },
        country: 'Pakistan',
        city: 'Karachi',
        address: 'PL# 35-A, Block 6, P.E.C.H.S Shara-e-faisal, Karachi, Pakistan',
        location: {
            lat: 1,
            log: 1
        },
        capacity: 500,
        mainPic: 'http://www.somethingperfectclt.com/wp-content/uploads/2018/08/Charlotte-Wedding-Planner-NC-wedding-Planner_0055.jpg',
        pics: [
            'http://venuehook.com/uploads/listing/1511261297IMG_4544%20%2001.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4549%20%2002.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4552%20%2003.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4553%20%2004.jpg',
            'http://venuehook.com/uploads/listing/1511261297IMG_4559%20%2005.jpg',
        ],
        dimention: { length: 100, width: 100, height: 100, unit: 'ft' },
        termsAndCondition: [
            'Soft Drinks are not included in above package and will be charged separately. (Billed on Actual Consumption)',
            'Mineral Water is not included in above package and will be charged separately (Billed on Actual Consumption)',
            'Musical, Religious, Political, Commercial or Public events are subject to approval from concerned authorities',
            'Function must end at 12:00 A.M or else penalty rate of PKR ----/hour will be applied unless NOC issued from concerned authorities',
            'Venue Premises  is secured by  CCTV cameras',
            'Religious, Political, Public or commercial events are subject to approval from concerned',
            'Booking of venue will be confirmed on receiving of 30% advance payment at the time of booking'
        ],
        feature: [
            { atrName: 'AC Availability', type: 0, price: 5000 },
            { atrName: 'Food Availability', type: 0, price: 20000 },
            { atrName: 'DJ Availability', type: 0, price: 6000 },
            { atrName: 'Ramp Walk Availability', type: 0, price: 3000 },
            { atrName: 'Speacial Decoration', type: 0, price: 4000 },
            {
                atrName: 'Speacial Lighting', type: 1, option: [
                    { title: 'category one', price: 1000 },
                    { title: 'category two', price: 2000 },
                    { title: 'category three', price: 3000 },
                ]
            },
        ],
        bestSuitableFor: [
            'Festival',
            'Fashion Show',
            'Music / Gig'
        ],
        venueTypes: 2,
        basicCost: 30000,
        totatCost: 1 //this should be generate by accoring to features and basicCost
    }
]

const featureTypes = {
    BOOLEAN: 0,
    LIST: 1
}

const venueTypes = {
    hotel: 0,
    resort: 1,
    club: 1,
    banquetHall: 2,
    farmHouse: 3,
    beachHouse: 4,
    sportGround: 5,
}

module.exports = { venues, featureTypes }