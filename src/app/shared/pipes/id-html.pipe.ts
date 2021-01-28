import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'idHtmlTransform' })
export class IdHtmlTransform implements PipeTransform {
    transform(id: string) : string {
        return `<small></small>`
    }

}