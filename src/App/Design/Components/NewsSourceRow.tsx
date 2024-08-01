import React from 'react'
import NewsSource from '../../../Domain/Model/NewsSource';
import CommonStyles from '../../Styles/CommonStyles';

interface NewsSourceRowProps {
    source: NewsSource,
    checked: boolean,
    onCheckChanged: (checked: boolean) => void,
    onRowClicked: () => void
}

export const NewsSourceRow: React.FC<NewsSourceRowProps> = ({source, checked, onCheckChanged, onRowClicked}: NewsSourceRowProps) => {
    return (
        <div className={`p-3 mb-3 d-flex justify-content-between ${CommonStyles.rowBackground()}`} onClick={onRowClicked}>
            <label className="form-check-label">{source.name}</label>
            <div className="form-check form-switch">
                <input className="form-check-input cursor-pointer"
                       type="checkbox"
                       role="switch"
                       id="flexSwitchCheckDefault"
                       checked={checked}
                       onChange={event => onCheckChanged(event.target.checked)}
                />
            </div>
        </div>
    )
}

export default NewsSourceRow