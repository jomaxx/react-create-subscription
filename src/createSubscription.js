import React from "react";

export default function createSubscription(subscribe) {
  class Subscription extends React.Component {
    static shouldRenew() {
      return false;
    }

    static getDerivedStateFromProps() {
      return null;
    }

    state = {};

    setState = this.setState.bind(this);

    componentDidMount() {
      this.componentWillUnmount = subscribe(this.props, this.setState);
    }

    componentDidUpdate(prevProps) {
      if (this.constructor.shouldRenew(this.props, prevProps)) {
        if (this.componentWillUnmount) this.componentWillUnmount();
        this.componentDidMount();
      }
    }

    render() {
      return this.props.children(this.state);
    }
  }

  return Subscription;
}
