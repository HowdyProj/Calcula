// A result panel (a monitor)
class ResultPanel extends React.Component {
    render() {
        return (<div className="navbar navbar-expand-lg navbar-dark bg-light text-dark" id="result">{this.props.title}</div>);
    }
}
// A button class specifically for calculation
class Button extends React.Component {
    render() {
        return (<button className="btn btn-warning" id={"btn-"+this.props.content}>{this.props.content}</button>)
    }
}

let res = <ResultPanel title="👾> "/>;
let btn = [];
let expression = "";
ReactDOM.render(res, document.getElementById("res"));
for (let i = 0; i <= 9; i++) {
    btn.push(<Button content={i}/>)
    ReactDOM.render(btn[i], document.getElementById("pos-"+i));
    document.getElementById("btn-"+i).addEventListener("click", function () {
        if (Number.parseInt(expression) > Number.MAX_SAFE_INTEGER || Number.parseInt(expression) < Number.MIN_SAFE_INTEGER) {
            document.getElementById("err-msg").textContent = "This integer has overflowed the constraints for a Javascript-standard integer. Attempt to clear the contents of the calculator and retry.";
        } else if (expression == "0") {
            document.getElementById("err-msg").textContent = "Any digit is not allowed to follow a 0 in a formal integer. Attempt to clear the contents of the calculator and retry.";
        } else {
            document.getElementById("result").textContent += this.id[4];
            document.getElementById("err-msg").textContent = "";
            expression += this.id[4];
        }
    })
}
let cls = <Button content="C"/>;
ReactDOM.render(cls, document.getElementById("pos-cls"));
document.getElementById("btn-C").addEventListener("click", function () {
    document.getElementById("result").textContent = "👾> ";
    document.getElementById("err-msg").textContent = "";
    expression = "";
});
let pn = <Button content="+/-"/>
ReactDOM.render(pn, document.getElementById("pos-pn"));
document.getElementById("btn-+/-").addEventListener("click", function () {
    if (expression[0] == "-") {
        expression = expression.substring(1);
    } else {
        expression = "-" + expression;
    }
    document.getElementById("result").textContent = "👾> " + expression;
    if (Number.parseInt(expression) > Number.MAX_SAFE_INTEGER || Number.parseInt(expression) < Number.MIN_SAFE_INTEGER) {
        document.getElementById("err-msg").textContent = "This integer has overflowed the constraints for a Javascript-standard integer. Attempt to clear the contents of the calculator and retry.";
    }
});
let del = <Button content="D"/>;
ReactDOM.render(del, document.getElementById("pos-del"));
document.getElementById("btn-D").addEventListener("click", function () {
    if (expression.length > 0) {
        expression = expression.substring(0, expression.length - 1);
        document.getElementById("result").textContent = "👾> " + expression;
        document.getElementById("err-msg").textContent = "";
    }
});
let eq = <Button content="="/>;
ReactDOM.render(eq, document.getElementById("pos-="));
document.getElementById("btn-=").addEventListener("click", function () {
    if (expression.length > 0) {
        expression = eval(expression)
        document.getElementById("result").textContent = "👾> " + expression;
        document.getElementById("err-msg").textContent = "";
    }
});
let ops = ["+", "-", "*", "/", "(", ")"];
for (let i = 0; i < 6; i++) {
    btn.push(<Button content={ops[i]}/>)
    ReactDOM.render(btn[i+10], document.getElementById("pos-"+ops[i]));
    document.getElementById("btn-"+ops[i]).addEventListener("click", function () {
        document.getElementById("result").textContent += this.id[4];
        document.getElementById("err-msg").textContent = "";
        expression += this.id[4];
    })
}