import { PlayerRepository } from "../../../database/repositories/Player.repository"

class UpdateCharacterService {
    static async execute(player: string, template: any) {
        await PlayerRepository.updateCharacter(player, template)
    }
}

export { UpdateCharacterService}