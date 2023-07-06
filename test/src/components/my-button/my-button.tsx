import { Component, Prop, Host, Watch, Listen, State, h } from "@stencil/core";

@Component({
    tag: 'my-button',
    styleUrl: 'my-button.scss',
    shadow: true
})

export class Button {

    @Prop() disabled = false;
    @Prop() size: 'large'| 'small' = 'large';
    @Prop() target: '_blank' | '_self' | '_parent' | '_top';
    @Prop() href: string;
    @State() dirty = false;
    private processedHref: string;
    button: HTMLButtonElement | HTMLAnchorElement | HTMLLinkElement

    @Watch('href')
    processHref(newValue:string): void{
        if (this.href != null) {
            const processedHrefSegments = this.processedHref == null ? [] : this.processedHref.split('?');
            const hrefSegments = this.href.split('?');
            processedHrefSegments.length < 2 ? (this.processedHref = hrefSegments[0]) : (this.processedHref = `${hrefSegments[0]}?${processedHrefSegments[1]}`)
        } else if(newValue ==null) {
            this.processedHref = null;
        }
    }

    componentWillRender(): void {

    }
    @Listen('click', {capture:true})
    handleClickEvent(event: MouseEvent): void {
        console.log(event)
        if (!this.disabled) {
            this.dirty = true;
        } else {
            event.stopPropagation();
            event.preventDefault()
        }
    }

    render() {
        const Tag: string = this.href != null ? 'a' : 'button';

        return (
            <Host>
                <Tag
                target={this.target} 
                disabled={this.disabled}
                ref={button => this.button = button}
                href={this.href}>
                    <slot></slot>
                </Tag>
            </Host>
        )
    }
}