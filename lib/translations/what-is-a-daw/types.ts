export interface DawArticleMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface DawArticleContent {
  metadata: DawArticleMetadata;
  breadcrumbs: {
    home: string;
    guides: string;
    current: string;
  };
  hero: {
    badge: string;
    readTime: string;
    verified: string;
    title: string;
    subtitle: string;
    bylinePrefix: string;
    author: string;
    updatedDate: string;
    targetTopicsLabel: string;
    targetTopics: string;
  };
  snippet: {
    heading: string;
    definition: string;
    acronymLabel: string;
    acronymValue: string;
    pronunciationLabel: string;
    pronunciationValue: string;
    primaryTaskLabel: string;
    primaryTaskValue: string;
  };
  engines: {
    tag: string;
    heading: string;
    intro: string;
    system1: {
      title: string;
      description: string;
      tag: string;
    };
    system2: {
      title: string;
      description: string;
      tag: string;
    };
    system3: {
      title: string;
      description: string;
      tag: string;
    };
    system4: {
      title: string;
      description: string;
      tag: string;
    };
    system5: {
      title: string;
      description: string;
      tag: string;
    };
  };
  comparison: {
    tag: string;
    heading: string;
    intro: string;
    tableHeaders: {
      name: string;
      price: string;
      os: string;
      curve: string;
      bestFor: string;
      exportFormat: string;
    };
    rows: {
      name: string;
      badge: string;
      badgeStyle: 'free' | 'trial' | 'paid';
      os: string;
      curve: string;
      curveStyle: 'easy' | 'mod' | 'steep';
      bestFor: string;
      exportFormat: string;
    }[];
    verdictMac: {
      title: string;
      desc: string;
    };
    verdictPc: {
      title: string;
      desc: string;
    };
  };
  audacityVsDaw: {
    tag: string;
    heading: string;
    p1: string;
    p2: string;
    bulletA: {
      label: string;
      title: string;
      desc: string;
    };
    bulletB: {
      label: string;
      title: string;
      desc: string;
    };
    p3: string;
    sideCard: {
      title: string;
      editorTitle: string;
      editorDesc: string;
      dawTitle: string;
      dawDesc: string;
      proTip: string;
    };
  };
  bottleneck: {
    tag: string;
    heading: string;
    intro: string;
    stat1: {
      label: string;
      value: string;
      desc: string;
    };
    stat2: {
      label: string;
      value: string;
      desc: string;
    };
    stat3: {
      label: string;
      value: string;
      desc: string;
    };
    ctaBox: {
      badge: string;
      heading: string;
      description: string;
      benefit1: string;
      benefit2: string;
      benefit3: string;
      primaryBtn: string;
      secondaryBtn: string;
      secondarySubtext: string;
      bottomTip: string;
    };
  };
  hardware: {
    tag: string;
    heading: string;
    intro: string;
    spec1: {
      title: string;
      desc: string;
    };
    spec2: {
      title: string;
      desc: string;
    };
    spec3: {
      title: string;
      desc: string;
    };
    spec4: {
      title: string;
      desc: string;
    };
  };
  faq: {
    tag: string;
    heading: string;
    intro: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footerLinks: {
    heading: string;
    links: {
      title: string;
      href: string;
    }[];
  };
}
