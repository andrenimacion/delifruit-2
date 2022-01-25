import { animate, state, style, transition, trigger } from "@angular/animations";

export const itemsindexAnimation = trigger('itemsindexanit', [
    state('hiddencont', style({
        opacity: 0
    })),
    state('hidden', style({
        opacity: 0
    })),
    state('show', style({
        opacity: 1
    })),

    state('hiddenti', style({
        opacity: 0,
        bottom: "-30px"
    })),
    state('showti', style({
        opacity: 1,
        bottom: "0px"
    })),

    state('hiddente', style({
        opacity: 0,
        top: "-20px"
    })),
    state('showte', style({
        opacity: 1,
        top: "0px"
    })),
    transition('* => hiddencont', animate('0.8s ease-in')),
    transition('hidden => show', animate('0.5s ease-in')),
    transition('show => hidden', animate('0.4s ease-in')),

    transition('hiddenti => showti', animate('0.5s ease-in')),
    transition('showti => hiddenti', animate('0.4s ease-in')),

    transition('hiddente => showte', animate('0.5s ease-in')),
    transition('showte => hiddente', animate('0.4s ease-in')),
  ])

export const indexAnimation = trigger('indexanit', [
    
    state('inactive', style({
        bottom: "-160px",
        left:  "-160px"
    })),
    state('actived', style({
        bottom: "-30px",
        left:  "-30px"
    })),
    state('activedlog', style({
        bottom: "-80px",
        left:  "-80px"
    })),

    state('inactive1', style({
        top: "-160px",
        right:  "-160px"
        
    })),
    state('actived1', style({
        top: "-30px",
        right:  "-30px"
    })),
    state('activedlog1', style({
        top: "-80px",
        right:  "-80px"
    })),
    transition('inactive => activedlog', animate('0.5s ease-in')),
    transition('inactive => activedlog1', animate('0.5s ease-in')),
    transition('inactive => actived', animate('0.5s ease-in')),
    transition('actived => inactive', animate('0.5s ease-in')),
    transition('inactive1 => actived1', animate('0.5s ease-in')),
    transition('actived1 => inactive1', animate('0.5s ease-in')),
  ])

  export const boxandmarkanit = trigger('maestroiconanit', [
    
    state('hiddenlines', style({
        strokeDashoffset: "-1000"
    })),
    state('iconcolor', style({
        fill: "#006335"
    })),
    state('reiconcolor', style({
        fill: "transparent",
        stroke: "#006335",
        strokeDashoffset: "1000"
    })),
    state('rehiddenlines', style({
        stroke: "rgba(0, 0, 0, 0.3)",
        strokeDashoffset: "0"
    })),
    state('textcoloract', style({
        color: "#006335"
    })),
    state('textcolorina', style({
        color: "rgba(0, 0, 0, 0.6)",
    })),
    state('inactive', style({
        transform: "rotate(0deg) scale(1)"
    })),
    state('actived0', style({
        transform: "rotate(-25deg) scale(0.6)"
    })), 
    state('actived', style({
        transform: "rotate(10deg) scale(1.1)"
    })),
    state('actived1', style({
        transform: "rotate(0deg) scale(1)"
    })),
    transition('inactive => actived0', animate('0.2s ease-in')),
    transition('actived0 => actived', animate('0.2s ease-in')),
    transition('actived => actived1', animate('0.2s ease-in')),
    transition('actived1 => inactive', animate('0.2s ease-in')),
  ])    
  
  export const dashanit = trigger('dashanit', [
  state('hiddenti', style({
    opacity: 0,
    bottom: "-30px"
})),
state('showti', style({
    opacity: 1,
    bottom: "0px"
})),
transition('hiddenti => showti', animate('.4s ease-in')),
transition('showti => hiddenti', animate('.4s ease-in'))
])   