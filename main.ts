namespace SpriteKind {
    export const mat_formel = SpriteKind.create()
}
function Spawner () {
    ny = tiles.getTilesByType(sprites.dungeon.collectibleInsignia)
    for (let value of ny) {
        skurk = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(skurk, value)
        skurk.follow(mySprite)
    }
}
function Mat_formel () {
    ny = tiles.getTilesByType(sprites.dungeon.floorLight0)
    for (let value of ny) {
        Formel = sprites.create(img`
            .cccccccccccccc.
            cbddddddddddddbc
            cddddddddddddddc
            cddddddddddddddc
            cddddddddddddddc
            cddddddddddddddc
            cddddddddddddddc
            cbddddddddddddbc
            ccbbbbbbbbbbbbcc
            ccffffffffffffcc
            cbc44c7c66c3ccbc
            cbc44c7c66c3ccbc
            fbc44c7c66c3ccbf
            fdccccccccccccdf
            fdcbbddddddbbcdf
            fdffffffffffffdf
            fdcc4c44c3c7ccdf
            fdcc4c44c3c7ccdf
            fdcccc44ccc7ccdf
            fdccccccccccccdf
            fdcbbddddddbbcdf
            fdcbbddddddbbcdf
            fdffffffffffffdf
            ffffffffffffffff
            `, SpriteKind.mat_formel)
        tiles.placeOnTile(Formel, value)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairWest, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.mat_formel, function (sprite, otherSprite) {
    game.splash(Potenser.shift())
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Potenser.length == 0) {
        let Antal_fjender: number[] = []
        if (Antal_fjender[fjendemaengde] == 4) {
            game.splash("4^4*4^3=?")
            if (game.ask("a=4^7 b=4^12")) {
                sprites.destroy(otherSprite)
            } else {
                info.changeLifeBy(-1)
                tiles.placeOnTile(mySprite, tiles.getTileLocation(7, 7))
            }
        }
    } else {
        info.changeLifeBy(-1)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(7, 7))
    }
})
let Formel: Sprite = null
let skurk: Sprite = null
let ny: tiles.Location[] = []
let fjendemaengde = 0
let mySprite: Sprite = null
let Potenser: string[] = []
Potenser = ["a^m*a^n = a^m+n", "(a^m)^n=a^m*n"]
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
tiles.setCurrentTilemap(tilemap`level2`)
tiles.placeOnTile(mySprite, tiles.getTileLocation(7, 7))
info.setLife(3)
Spawner()
Mat_formel()
fjendemaengde = tiles.getTilesByType(sprites.dungeon.collectibleInsignia)
forever(function () {
    if (info.life() == 0) {
        game.gameOver(false)
    }
})
