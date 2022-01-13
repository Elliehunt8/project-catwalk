import React, { useContext } from 'react';
import { AppProvider, AppContext } from './AppProvider.jsx';
import Overview from './Overview/Overview.jsx';
import { OverviewProvider } from './Overview/OverviewContext.jsx';
import QuestionsAndAnswers from './Q&A/QuestionsAndAnswers.jsx';
import RatingReviews from './RatingReviews/RatingReviews.jsx';
import Related from './RelatedItems/RelatedItems.jsx';

const App = (props) => {

  return (
    <AppProvider>
      <div id="container">
        <header>
          <div className="logo">To Infinity &amp; Beyond!</div>
          <nav>
            <ul>
              <li></li>
            </ul>
          </nav>
        </header>
        {/* <OverviewProvider>
          <Overview />
        </OverviewProvider>
        <div id="related-products">Related Products</div>
        <div className="related">
          <Related />
        </div> */}
        <div id="questions-answers">Questions &amp; Answers</div>
        <QuestionsAndAnswers />
        {/* <RatingReviews /> */}
      </div>
    </AppProvider>
  );
};

export default App;