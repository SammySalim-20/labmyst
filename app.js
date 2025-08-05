const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Labmyst | Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Labmyst | About Us' });
});

app.get('/products', (req, res) => {
  res.render('products', { title: 'Labmyst | Products' });
});
app.get('/products/analytical', (req, res) => {
  const instruments = [
    {
      name: 'UV-Vis Spectrophotometer',
      image: '/images/uv-vis.jpg',
      description: 'Used to measure light absorbance across UV and visible ranges.'
    },
    {
      name: 'Gas Chromatograph (GC)',
      image: '/images/gc.jpg',
      description: 'For separating and analyzing compounds in gas form.'
    },
    {
      name: 'HPLC System',
      image: '/images/hplc.jpg',
      description: 'High-performance liquid chromatography for precise chemical separation.'
    },
    {
      name: 'Atomic Absorption Spectrometer',
      image: '/images/aas.jpg',
      description: 'Ideal for elemental analysis using atomic absorption.'
    }
  ];

  res.render('analytical', { title: 'Labmyst | Analytical Instruments', instruments });
});

app.get('/products/general', (req, res) => {
  const equipment = [
    {
      name: 'Laboratory Oven',
      image: '/images/lab-oven.jpg',
      description: 'Used for drying, heating, and sterilizing lab materials.'
    },
    {
      name: 'Centrifuge Machine',
      image: '/images/centrifuge.jpg',
      description: 'Separates components of different densities in fluids.'
    },
    {
      name: 'Hot Plate Magnetic Stirrer',
      image: '/images/stirrer.jpg',
      description: 'Combines heating and stirring for sample preparation.'
    },
    {
      name: 'Vacuum Pump',
      image: '/images/vacuum-pump.jpg',
      description: 'Creates vacuum environments for filtration or evaporation.'
    }
  ];

  res.render('general', { title: 'Labmyst | General Lab Equipment', equipment });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Labmyst | Contact' });
});

app.get('/products/medical', (req, res) => {
  const devices = [
    {
      name: 'Clinical Centrifuge',
      image: '/images/clinical-centrifuge.jpg',
      description: 'Used for blood separation and other clinical applications.'
    },
    {
      name: 'Blood Collection Monitor',
      image: '/images/blood-collection-monitor.jpg',
      description: 'Used for blood collections in donation room.'
    },
    //{
    //  name: 'ECG Machine',
    //  image: '/images/ecg-machine.jpg',
    // description: 'Electrocardiogram device for cardiac monitoring.'
    //}
  ];

  res.render('medical', { title: 'Labmyst | Medical & Clinical Devices', devices });
});


// Optional: POST handler for contact form
app.post('/send-message', express.urlencoded({ extended: true }), (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message from ${name} (${email}): ${message}`);
  res.send('Message received. We will contact you soon.');
});

// Explore Products Page
app.get('/explore', (req, res) => {
  const products = [
    {
      name: 'Spectrophotometer',
      image: '/images/spectrophotometer.jpg',
      description: 'Used for measuring light absorbance in labs.'
    },
    {
      name: 'Laboratory Oven',
      image: '/images/lab-oven.jpg',
      description: 'Ideal for drying and sterilization processes.'
    },
    {
      name: 'Autoclave',
      image: '/images/autoclave.jpg',
      description: 'High-pressure steam sterilizer for lab equipment.'
    },
    {
      name: 'pH Meter',
      image: '/images/ph-meter.jpg',
      description: 'Accurate pH measurement for scientific analysis.'
    }
  ];

  res.render('explore', { title: 'Labmyst | Explore Products', products });
});


// Show Request Quote Form
app.get('/request-quote', (req, res) => {
  res.render('quote', { title: 'Labmyst | Request a Quote' });
});

// Handle Quote Form Submission
app.post('/request-quote', express.urlencoded({ extended: true }), (req, res) => {
  const { name, email, company, product, quantity, message } = req.body;
  console.log('Quote Request:', { name, email, company, product, quantity, message });

  // Here you can:
  // - Send an email using Nodemailer
  // - Save the data to a database
  // - Send a confirmation page or flash message

  res.send('Your quote request has been received. Our team will contact you shortly.');
});


// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});


// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Labmyst.com running on http://localhost:${PORT}`);
});