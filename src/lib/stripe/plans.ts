const BASIC_PLAN_TOKENS =
  Number(process.env.BASIC_PLAN_TOKENS);
 
const PRO_PLAN_TOKENS
  = Number(process.env.PRO_PLAN_TOKENS);
const plans = [
    {
      name: 'Basic',
      description: 'A basic plan for everyone',
      features: [`Enjoy up to 500,000 tokens per month`, `Email Support`],
      trialPeriodDays: 30,
      prices: [
        {
          id: 'price_1OaExGSHxgmhOeV5SJNKOQgP',
          name: 'Monthly',
          description: 'A monthly plan',
          price: 100,
          tokens: BASIC_PLAN_TOKENS,
        },
        {
          id: 'price_1OaExGSHxgmhOeV5af4HyO9r',
          name: 'Yearly',
          description: 'A yearly plan',
          price: 1000,
          tokens: BASIC_PLAN_TOKENS * 12,
        },
      ],
    },
    {
      name: 'Pro',
      description: 'A pro plan for ambitious writers',
      features: [`Enjoy up to 3 million tokens per month`, `Chat Support`],
      trialPeriodDays: 14,
      prices: [
        {
          id: 'price_1OaFEtSHxgmhOeV5RFCFLNlp',
          name: 'Monthly',
          description: 'A monthly plan',
          price: 200.00,
          tokens: PRO_PLAN_TOKENS,
        },
        {
          id: 'price_1OaFEtSHxgmhOeV5tEKFlfgN',
          name: 'Yearly',
          description: 'A yearly plan',
          price: 1800.00,
          tokens: PRO_PLAN_TOKENS * 12,
        },
      ],
    },
  ];
   
  export default plans;