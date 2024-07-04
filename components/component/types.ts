export type Issue = {
  title: string;
  state: string;
  html_url: string;
  url: string;
};

export type Commits = {
  html_url: string;
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
};
