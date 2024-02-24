import './account.css'

function Account({title,amount,amountDescription,showLink}){
    
    return (
        <div>
<section className={showLink?"account":"account account-center"}>
                <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">${amount}</p>
                <p className="account-amount-description">{amountDescription}</p>
                </div>
                <div className="account-content-wrapper cta">
                {showLink&&<button className="transaction-button">View transactions</button>}
                </div>
            </section>
            
        </div>
    )
}
export default Account