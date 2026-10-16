import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsTemplate = () =>
  `
    <p>130 291 movies inside</p>
  `;

class FooterStatisticsView extends AbstractView {
  get template() {
    return createFooterStatisticsTemplate();
  }
}

export default FooterStatisticsView;
