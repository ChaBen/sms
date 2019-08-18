export default {
  head: {
    lang: 'LANGUAGE',
    menu: [{
      li: 'Login',
      href: 'login',
      auth: 1
    }, {
      li: 'Register',
      href: 'signup',
      auth: 1
    }, {
      li: 'Charge',
      href: 'pricing',
      auth: 2
    }, {
      li: 'Logout',
      href: '',
      auth: 3
    }, {
      li: 'Send SMS',
      href: 'sms',
      auth: 2
    }]
  },
  index: {
    title: 'EASY SEND SMS',
    desc: `Mobile users in the world today are more than before. Means if you are not already engaging your target customers with mobile marketing, you're missing out a great marketing tool that keeps you in contact with your customers, informed, and following your business..`,
    title1: 'WHAT IS BULK SMS MESSAGING?',
    desc1: 'Bulk SMS is the technology that lets you send hundreds, even millions of sms messages at a time to phone numbers with 1 click of a button. When sending bulk SMS, the cost of one sent or delivered sms message gets significantly cheaper. You can even set your own sender name, which is the text the receiver’s mobile phone as the SMS sender.Easy Send SMS provides you with everything from a high-quality bulk SMS messaging service',
    desc1Sec: [{
      title: 'SALES INCREASE',
      desc: 'Boost your sales up to 50% by sending sms text messages to your customers, letting them know about your new products or services, discounts, events, offers, reminders, etc.',
      icon: 'trending_up',
      color: 'info'
    }, {
      title: 'COST-EFFECTIVE',
      desc: 'Bulk SMS messages are the best way to grow your business with up to 98% SMS promotions. Choose the most effective SMS gateway and text bulk SMS text messages.',
      icon: 'attach_money',
      color: 'danger'
    }, {
      title: 'SUCCESS STATISTICS',
      desc: 'Send bulk text messages, keep track your SMS marketing campaigns with our powerful online DLR tools. Based on extensive SMS delivery reports in real time.',
      icon: 'verified_user',
      color: 'success'
    }],
    secTitle: 'Reasons to Choose SMS Service',
    sec: [{
      title: 'Why Cell Phone?',
      desc: 'The future of advertising is up to companies that organize cheap sms and act aspromotional SMS service providers. There are numerous advantages of cooperation with them and using sms advertising at lowest rates.',
      icon: 'mobile_friendly'
    }, {
      title: 'SMS Messages are Read in Minutes',
      desc: 'With an open rate of over 90%, SMS digital text outbeats email when it comes to reaching customers in an on time manner. As a rule, messages are read in less than 4 minutes after they’ve been delivered by mobile service providers, which makes sms promoyion services highly effective.',
      icon: 'timer'
    }, {
      title: 'Low Cost',
      desc: 'Ads for business from Canada SMS is nearly the cheapest on the market. Even small and medium businesses with a very tight budget can easily afford mobile text message, especially if they send bulk SMS via the Canada SMS SMS campaign provider & mobile platform and a nice texting for business market area.',
      icon: 'money_off'
    }, {
      title: 'High Conversion Rate',
      desc: 'When you order mobile market campaigns , you can count on high conversion rate. Individuals will probably make a move after they read a limited time SMS. A normal conversion rate of texts is around 8%. For Email channel this figure is around 1.73%, though marketing by SMS can gloat a transformation rate of 4.43%, yet its normal CTR is under 1%.',
      icon: 'show_chart'
    }],
    sec1Title: 'WHO NEEDS BULK SMS',
    sec1Desc: 'Bulk SMS technology can be effectively used in many different industries since this communication channel is inexpensive, fast, and a highly reliable. No social messengers and email can outperform mass text messaging. In few seconds you can reach as many people as you want, when you want, no matter where they are.',
    sec1: [{
      title: 'GAMING INDUSTRY',
      desc: 'For online games providers, as well as lotteries, and gambling sites. They widely use bulk SMS to send welcome messages, notifications about freebies and special events.',
      icon: 'videogame_asset',
      color: 'info'
    }, {
      title: 'ONLINE SERVICES',
      desc: 'Online services use bulk SMS as a two-factor authentication method to provide a secure digital experience for users. Other uses messages about available account balance, changes in pricing, etc.',
      icon: 'contact_phone',
      color: 'success'
    }],
    sec2: [{
      title: 'BIG COMPANIES',
      desc: 'Bulk SMS has proven to managing internal communications within a company. When you need to distribute internal surveys, send reminders or inform your employees about corporate events.',
      icon: 'group_add',
      color: 'primary'
    }, {
      title: 'SMALL & MEDIUM BUSINESS',
      desc: 'Marketers found that bulk SMS marketing is highly effective. 76% of people say they wouldn’t mind receiving promotional SMS text messages informing them about discounts, premium events, reminders, etc.',
      icon: 'group',
      color: 'warning'
    }]
  },
  login: {
    title: 'Login',
    signup: 'REGISTER',
    email: 'Email...',
    password: 'Password...'
  },
  signup: {
    title: 'Register',
    email: 'Email...',
    password: 'Password...',
    passwordConf: 'Confirm Password',
    sec: [{
      title: 'Register',
      desc: 'Test using a quick subscription.',
      icon: 'alarm',
      color: 'success'
    }, {
      title: 'Free',
      desc: 'Get 10 free sms for global sending to test the service.',
      icon: 'money_off',
      color: 'warning'
    }, {
      title: 'SMS',
      desc: 'Bulk SMS will be sent directly to your customers, to keeping them notified about your business events,reminders, promotions or notifications.',
      icon: 'sms',
      color: 'rose'
    }]
  },
  pricing: {
    title: 'Pick the best plan for you',
    desc: 'You have Free Unlimited Updates and Premium Support on each package.',
    persms: 'Per SMS',
    deliveryRate: 'Delivery Rate',
    send: 'SMS'
  },
  sms: {
    total: 'SMS Remaining',
    send: 'Send Total',
    account: 'Account Total',
    title: 'SMS Content',
    phone: 'Send Phone Number',
    textarea: 'Your Message'
  },
  success: {
    title: 'Thank you for your purchase.',
    title1: 'Purchase Details',
    name: 'Name',
    buyemail: 'BuyEmail',
    count: 'SMS COUNT',
    price: 'Price'
  }
}
